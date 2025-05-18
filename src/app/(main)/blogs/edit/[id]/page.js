'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import 'react-quill-new/dist/quill.snow.css';
import styles from './edit.module.scss';
import { toast } from 'react-toastify';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function EditPostPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [post, setPost] = useState({
    title: '',
    content: '',
    image: '',
    tags: [],
    category: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return; // Wait for params to be available
    async function fetchPostData() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error('Failed to fetch post');
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchPostData();
  }, [id]);
  console.log(post);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        toast.success('Post updated successfully!');
        router.push(`/user-profile`);
      } else {
        alert('Error updating post!');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }

    setLoading(false);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };

  return (
    <section className={styles.editPost}>
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

        <ReactQuill
          value={post.content}
          onChange={(value) => setPost({ ...post, content: value })}
          modules={modules}
          className={styles.quil}
          style={{ width: '100%', height: '300px' }}
        />

        <label>
          Tags:
          <input
            type="text"
            value={post.tags.join(', ')}
            onChange={(e) =>
              setPost({ ...post, tags: e.target.value.split(',') })
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
        <button type="submit" disabled={loading} className="btn">
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </section>
  );
}
