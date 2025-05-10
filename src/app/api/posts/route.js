// import { connectToDB } from '@/lib/mongodb';
// import Post from '@/models/Post';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../auth/[...nextauth]/route';

// export async function GET(req) {
//   await connectToDB();
//   const posts = await Post.find({}).populate('author', 'name email');
//   return Response.json(posts);
// }

// export async function POST(req) {
//   const session = await getServerSession(authOptions);
//   if (!session) return new Response('Unauthorized', { status: 401 });

//   const { title, content, image, tags, category } = await req.json();

//   await connectToDB();
//   const newPost = await Post.create({
//     title,
//     content,
//     image,
//     tags,
//     category,
//     author: session.user.id,
//   });

//   return Response.json(newPost, { status: 201 });
// }
