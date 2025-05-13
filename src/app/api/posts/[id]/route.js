import { authOptions } from '@/lib/auth';
import { connectToDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';
import { getServerSession } from 'next-auth';

export async function GET(req, context) {
  try {
    const { params } = context; // context must be awaited synchronously
    const postId = params.id;

    await connectToDB();

    const post = await Post.findById(postId)
      .populate('author', 'name image')
      .populate('comments.user', 'name image');

    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    return Response.json(post);
  } catch (err) {
    console.error(err);
    return new Response('Server error', { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });

  const { title, content, image, tags, category } = await req.json();

  await connectToDB();
  const post = await Post.findById(params.id);

  if (!post) return new Response('Not Found', { status: 404 });
  if (post.author.toString() !== session.user.id) {
    return new Response('Forbidden', { status: 403 });
  }

  post.title = title;
  post.content = content;
  post.image = image;
  post.tags = tags;
  post.category = category;

  await post.save();

  return Response.json(post);
}

export async function DELETE(_, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });

  await connectToDB();
  const post = await Post.findById(params.id);

  if (!post) return new Response('Not Found', { status: 404 });
  if (post.author.toString() !== session.user.id) {
    return new Response('Forbidden', { status: 403 });
  }

  await post.deleteOne();
  return new Response('Deleted Successfully!', { status: 200 });
}
