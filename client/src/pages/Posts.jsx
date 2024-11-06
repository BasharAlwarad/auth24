import { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/posts`, {
        withCredentials: true,
      });
      setPosts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch posts');
      setPosts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/posts`,
        { text, image },
        { withCredentials: true }
      );
      setPosts([response.data, ...posts]);
      setText('');
      setImage('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post');
    }
  };

  const updatePost = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/posts/${id}`,
        { text, image },
        { withCredentials: true }
      );
      setPosts(posts.map((post) => (post._id === id ? response.data : post)));
      setEditingPost(null);
      setText('');
      setImage('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update post');
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/posts/${id}`, {
        withCredentials: true,
      });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete post');
    }
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-3xl font-semibold text-center">Posts</h2>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      <div className="mb-6">
        <h3 className="mb-2 text-xl font-semibold">
          {editingPost ? 'Edit Post' : 'Create Post'}
        </h3>
        <input
          type="text"
          placeholder="Post text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full mb-2 input input-bordered"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full mb-4 input input-bordered"
        />
        <button
          onClick={editingPost ? () => updatePost(editingPost) : createPost}
          className="w-full btn btn-primary"
        >
          {editingPost ? 'Update Post' : 'Create Post'}
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="p-4 rounded-lg shadow-md bg-gray-50">
              <p className="text-lg font-medium">{post.text}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="object-cover w-full h-48 mt-2 rounded-lg"
                />
              )}
              <p className="mt-2 text-sm text-gray-500">
                Posted by: {post.user.name}
              </p>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => {
                    setText(post.text);
                    setImage(post.image);
                    setEditingPost(post._id);
                  }}
                  className="btn btn-outline btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePost(post._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No posts available.</p>
      )}
    </div>
  );
};

export default Posts;
