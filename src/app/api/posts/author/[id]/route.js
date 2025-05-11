import { connectToDB } from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const posts = await Post.find({ author: params.id })
      .populate('author', 'name image') // Optional if needed on the frontend
      .sort({ createdAt: -1 });

    return Response.json(posts);
  } catch (err) {
    console.error(err);
    return new Response('Server Error', { status: 500 });
  }
}
