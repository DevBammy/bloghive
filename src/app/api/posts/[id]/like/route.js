// import { connectToDB } from '@/lib/mongodb';
// import Post from '@/models/Post';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../../auth/[...nextauth]/route';

// export async function POST(req, { params }) {
//   const session = await getServerSession(authOptions);
//   if (!session) return new Response('Unauthorized', { status: 401 });

//   await connectToDB();
//   const post = await Post.findById(params.id);

//   if (!post) return new Response('Post not found', { status: 404 });

//   const userId = session.user.id;
//   const isLiked = post.likes.includes(userId);

//   // Toggle like
//   if (isLiked) {
//     // Remove like
//     post.likes = post.likes.filter((like) => like.toString() !== userId);
//   } else {
//     // Add like
//     post.likes.push(userId);
//   }

//   await post.save();

//   return Response.json(post);
// }

// export async function GET(_, { params }) {
//   await connectToDB();
//   const post = await Post.findById(params.id).populate('likes', 'name email');

//   if (!post) return new Response('Post not found', { status: 404 });

//   return Response.json(post.likes);
// }
