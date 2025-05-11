import { connectToDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PATCH(req, { params }) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) return new Response('Unauthorized', { status: 401 });

    const session = { user: { id: '681e16fbc818363319cc0f32' } }; // temp

    await connectToDB();

    const post = await Post.findById(params.id);
    if (!post) return new Response('Post not found', { status: 404 });

    const userId = session.user.id;
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes.pull(userId); // unlike
    } else {
      post.likes.push(userId); // like
    }

    await post.save();

    return Response.json({ liked: !isLiked, likesCount: post.likes.length });
  } catch (err) {
    console.error(err);
    return new Response('Server error', { status: 500 });
  }
}
