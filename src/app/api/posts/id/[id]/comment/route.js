// import Comment from '@/models/Comment';

import { connectToDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req, { params }) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) return new Response('Unauthorized', { status: 401 });

    const session = { user: { id: '681e16fbc818363319cc0f32' } }; // temp

    const { content } = await req.json();
    if (!content)
      return new Response('Comment content required', { status: 400 });

    await connectToDB();

    const post = await Post.findById(params.id);
    if (!post) return new Response('Post not found', { status: 404 });

    const comment = {
      user: session.user.id,
      content,
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();

    return Response.json({ message: 'Comment added', comment });
  } catch (err) {
    console.error(err);
    return new Response('Server error', { status: 500 });
  }
}

// export async function GET(_, { params }) {
//   await connectToDB();
//   const comments = await Comment.find({ postId: params.id }).populate(
//     'userId',
//     'name email'
//   );

//   if (!comments) return new Response('No comments found', { status: 404 });

//   return Response.json(comments);
// }
