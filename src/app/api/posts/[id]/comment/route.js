import { connectToDB } from '@/lib/mongodb';
import Comment from '@/models/Comment';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(_, { params }) {
  await connectToDB();
  const comments = await Comment.find({ postId: params.id }).populate(
    'userId',
    'name email'
  );

  if (!comments) return new Response('No comments found', { status: 404 });

  return Response.json(comments);
}

export async function POST(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });

  const { content } = await req.json();

  if (!content)
    return new Response('Comment content is required', { status: 400 });

  await connectToDB();

  const newComment = new Comment({
    postId: params.id,
    userId: session.user.id,
    content,
  });

  await newComment.save();

  return Response.json(newComment, { status: 201 });
}
