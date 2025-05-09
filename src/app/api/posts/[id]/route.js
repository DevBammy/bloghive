// import { connectToDB } from '@/lib/mongodb';
// import Post from '@/models/Post';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../../auth/[...nextauth]/route';

// export async function GET(_, { params }) {
//   await connectToDB();
//   const post = await Post.findById(params.id).populate('author', 'name email');
//   if (!post) return new Response('Not Found', { status: 404 });
//   return Response.json(post);
// }

// export async function PUT(req, { params }) {
//   const session = await getServerSession(authOptions);
//   if (!session) return new Response('Unauthorized', { status: 401 });

//   const { title, content, image, tags, category } = await req.json();

//   await connectToDB();
//   const post = await Post.findById(params.id);

//   if (!post) return new Response('Not Found', { status: 404 });
//   if (post.author.toString() !== session.user.id) {
//     return new Response('Forbidden', { status: 403 });
//   }

//   post.title = title;
//   post.content = content;
//   post.image = image;
//   post.tags = tags;
//   post.category = category;

//   await post.save();

//   return Response.json(post);
// }

// export async function DELETE(_, { params }) {
//   const session = await getServerSession(authOptions);
//   if (!session) return new Response('Unauthorized', { status: 401 });

//   await connectToDB();
//   const post = await Post.findById(params.id);

//   if (!post) return new Response('Not Found', { status: 404 });
//   if (post.author.toString() !== session.user.id) {
//     return new Response('Forbidden', { status: 403 });
//   }

//   await post.deleteOne();
//   return new Response('Deleted', { status: 200 });
// }
