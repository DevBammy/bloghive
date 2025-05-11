'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import Image from 'next/image';
import styles from './create.module.scss';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [except, setExcept] = useState('');

  console.log(title, content, tags, category, image, preview);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';
    if (image) {
      const formData = new FormData();
      formData.append('file', image);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        console.error('Image upload failed');
        return;
      }

      const data = await res.json();
      imageUrl = data.url;
    }

    const post = {
      title,
      content,
      tags: tags.split(',').map((t) => t.trim()),
      category,
      image: imageUrl,
      author: 'USER_ID',
    };

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });

    if (!res.ok) {
      console.error('Post creation failed');
      return;
    }

    // Optionally redirect or show success message
    console.log('Post created successfully');
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
    <section className={styles.CreatePostPage}>
      <h2>Create a new blog post</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formControl}>
          <label htmlFor="title">Post Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="content">Post Body</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            className={styles.quil}
            style={{ width: '100%', height: '300px' }}
          />
        </div>

        <div className={styles.subControl}>
          <div className={styles.formControl}>
            <label htmlFor="tags">Post tags</label>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor="category">Post category</label>
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor="preview">Post preview</label>
            <textarea
              type="text"
              placeholder="Post review"
              value={except}
              onChange={(e) => setExcept(e.target.value)}
              required
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor="file">Post Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {preview && (
            <Image src={preview} alt="preview" style={{ maxWidth: 200 }} />
          )}
        </div>
        <button type="submit" className="btn">
          Create Post
        </button>
      </form>
    </section>
  );
};

export default CreatePostPage;
