'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import 'react-quill-new/dist/quill.snow.css';
import Image from 'next/image';
import { uploadImage } from '@/lib/upload';
import { toast } from 'react-toastify';
import styles from './create.module.scss';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const CreatePostPage = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data: session, status } = useSession();
  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <p>You must be logged in to create a post</p>;

  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    image: null,
    preview: '',
    except: '',
    time: '',
  });

  const { title, content, category, tags, image, preview, except, time } =
    formData;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: '',
      tags: '',
      image: null,
      preview: '',
      except: '',
      time: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!title || !content || !category || !tags || !except || !image) {
        toast.error('Please fill in all fields');
        setSubmitting(false);
        return;
      }

      toast.info('Uploading image...');
      const imageUrl = await uploadImage(image);

      if (!imageUrl) {
        toast.error('Image upload failed');
        setSubmitting(false);
        return;
      }

      const post = {
        title,
        content,
        tags: tags.split(',').map((t) => t.trim()),
        category,
        image: imageUrl,
        author: session.user.id,
        except,
        time,
      };

      const res = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.message || 'Failed to publish post');
        setSubmitting(false);
        return;
      }

      toast.success('Post submitted successfully!');
      resetForm();
      router.push('/');
    } catch (error) {
      console.error('Error:', error.message || error);
      toast.error('Failed to submit post');
    } finally {
      setSubmitting(false);
    }
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
      <h2>Create a New Blog Post</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formControl}>
          <label htmlFor="title">Post Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formControl}>
          <label htmlFor="content">Post Body</label>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={modules}
            className={styles.quil}
            style={{ width: '100%', height: '300px' }}
          />
        </div>

        <div className={styles.subControl}>
          <div className={styles.formControl}>
            <label htmlFor="tags">Post Tags</label>
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor="category">Post Category</label>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={category}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor="except">Post Preview/Except</label>
            <textarea
              name="except"
              placeholder="Short preview / excerpt"
              value={except}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor="image">Post Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="time">Reading Time</label>
            <input type="text" name="time" onChange={handleChange} required />
          </div>

          {preview && (
            <Image
              src={preview}
              alt="Image Preview"
              width={200}
              height={150}
              style={{ objectFit: 'cover', marginTop: '1rem' }}
            />
          )}
        </div>

        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Create Post'}
        </button>
      </form>
    </section>
  );
};

export default CreatePostPage;
