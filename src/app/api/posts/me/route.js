import { connectToDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });

  try {
    await connectToDB();
    const posts = await Post.find({ author: session.user.id }).sort({
      createdAt: -1,
    });
    return Response.json(posts);
  } catch (err) {
    console.error(err);
    return new Response('Server Error', { status: 500 });
  }
}

export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });

  try {
    const { name, image, email, password } = await req.json();
    await connectToDB();

    const updateFields = {};

    if (name) updateFields.name = name;
    if (image) updateFields.image = image;
    if (email) updateFields.email = email;
    if (password) updateFields.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      updateFields,
      { new: true }
    );

    return Response.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    return new Response('Server Error', { status: 500 });
  }
}
