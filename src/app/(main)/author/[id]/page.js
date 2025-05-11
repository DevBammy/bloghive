// import React from 'react';

// async function getAuthorPosts(id) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/author/${id}`,
//     {
//       cache: 'no-store',
//     }
//   );
//   return res.json();
// }

// export default async function AuthorPage({ params }) {
//   const posts = await getAuthorPosts(params.id);

//   return (
//     <div className="author-posts">
//       <h1>Posts by {posts[0]?.author?.name || 'Author'}</h1>
//       <ul>
//         {posts.map((post) => (
//           <li key={post._id}>
//             <h2>{post.title}</h2>
//             <p>{post.content.substring(0, 100)}...</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

{
  /* <Link
  href={`/author/${post.author._id}`}
  className="text-blue-500 hover:underline"
>
  {post.author.name}
</Link>; */
}
