import { connectToDB } from '@/lib/mongodb';
import Post from '@/models/Post';
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
