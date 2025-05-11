import { connectToDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req, context) {
  try {
    const { params } = await context;

    await connectToDB();

    const post = await Post.findById(params.id)
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
  // const session = await getServerSession(authOptions);
  // if (!session) return new Response('Unauthorized', { status: 401 });

  const session = { user: { id: '681e16fbc818363319cc0f32' } };

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
  // const session = await getServerSession(authOptions);
  // if (!session) return new Response('Unauthorized', { status: 401 });

  const session = { user: { id: '681e16fbc818363319cc0f32' } };

  await connectToDB();
  const post = await Post.findById(params.id);

  if (!post) return new Response('Not Found', { status: 404 });
  if (post.author.toString() !== session.user.id) {
    return new Response('Forbidden', { status: 403 });
  }

  await post.deleteOne();
  return new Response('Deleted Successfully!', { status: 200 });
}
