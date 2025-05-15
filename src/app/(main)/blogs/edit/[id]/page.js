'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditPostPage({ params }) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [post, setPost] = useState({
    title: '',
    content: '',
    image: '',
    tags: [],
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchPostData() {
      const res = await fetch(`${API_BASE_URL}/api/posts/id/${params.id}`);
      const data = await res.json();
      setPost(data);
    }

    fetchPostData();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch(`${API_BASE_URL}/api/posts/id/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: post.title,
        content: post.content,
        image: post.image,
        tags: post.tags,
        category: post.category,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      alert('Post updated successfully!');
      router.push(`/user-profile`);
    } else {
      alert('Error updating post!');
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </label>
        <label>
          Content:
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={post.image}
            onChange={(e) => setPost({ ...post, image: e.target.value })}
          />
        </label>
        <label>
          Tags:
          <input
            type="text"
            value={post.tags.join(', ')}
            onChange={(e) =>
              setPost({ ...post, tags: e.target.value.split(', ') })
            }
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}
