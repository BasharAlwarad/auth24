import Post from '../models/postsModel.js';
import User from '../models/usersModel.js';
import { CustomError } from '../utils/errorHandler.js';

// Get all posts
export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('user', 'name email');
    res.status(200).json(posts);
  } catch (error) {
    next(new CustomError('Failed to retrieve posts', 404));
  }
};

// Get post by ID
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      'user',
      'name email'
    );
    if (!post) {
      throw new CustomError('Post not found', 404);
    }
    res.status(200).json(post);
  } catch (error) {
    next(new CustomError(error.message || 'Failed to retrieve post', 404));
  }
};

// Create a new post
export const createPost = async (req, res, next) => {
  try {
    const { text, image } = req.body;
    const userId = req.user.id;

    const newPost = new Post({
      text,
      image: image || undefined,
      user: userId,
    });

    console.log(newPost);
    await newPost.save();

    res.status(201).json({
      text: newPost.text,
      image: newPost.image,
      _id: newPost._id,
      user: req.user,
    });
  } catch (error) {
    next(new CustomError(error.message || 'Failed to create post', 400));
  }
};

// Update post by ID
export const updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const updates = req.body;

    const updatedPost = await Post.findByIdAndUpdate(postId, updates, {
      new: true,
      runValidators: true,
    }).populate('user', 'name email');

    if (!updatedPost) {
      throw new CustomError('Post not found', 404);
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next(new CustomError(error.message || 'Failed to update post', 400));
  }
};

// Delete post by ID
export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      throw new CustomError('Post not found', 404);
    }

    res.status(204).json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(new CustomError(error.message || 'Failed to delete post', 400));
  }
};

// Get posts by authenticated user
export const getPostsByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const posts = await Post.find({ user: userId });
    res.status(200).json(posts);
  } catch (error) {
    next(new CustomError(error.message || 'Failed to retrieve posts', 404));
  }
};
