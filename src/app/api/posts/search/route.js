import { connectToDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const query = searchParams.get('query');

    const filter = {};

    let Posts = [];

    // Full-text search on title/content
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (tag) {
      filter.tags = tag;
    }

    const posts = await Post.find(filter)
      .populate('author', 'name image')
      .sort({ createdAt: -1 });

    return Response.json(posts);
  } catch (err) {
    console.error(err);
    return new Response('Server error', { status: 500 });
  }
}
