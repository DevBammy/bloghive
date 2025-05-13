import { authOptions } from '@/lib/auth';
import { connectToDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { getServerSession } from 'next-auth';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new Response('Unauthorized', { status: 401 });

    const { title, content, image, category, tags, except } = await req.json();
    if (!title || !content) {
      return new Response('Title and content are required', { status: 400 });
    }

    await connectToDB();

    const newPost = await Post.create({
      title,
      content,
      image,
      category,
      tags,
      except,
      author: session.user.id,
      likes: [],
      comments: [],
    });

    return Response.json(
      { message: 'Post created', post: newPost },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new Response('Server error', { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();

    const posts = await Post.find()
      .populate('author', 'name image')
      .sort({ createdAt: -1 });

    return Response.json(posts);
  } catch (err) {
    console.error(err);
    return new Response('Server error', { status: 500 });
  }
}
