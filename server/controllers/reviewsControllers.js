import Review from '../models/reviewModel.js';
import Post from '../models/postsModel.js';
import { CustomError } from '../utils/errorHandler.js';

// Get all reviews for a specific post
export const getReviewsByPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const reviews = await Review.find({ post: postId }).populate(
      'user',
      'name email'
    );
    res.status(200).json(reviews);
  } catch (error) {
    next(new CustomError('Failed to retrieve reviews', 404));
  }
};

// Get a single review by ID
export const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      'user',
      'name email'
    );
    if (!review) {
      throw new CustomError('Review not found', 404);
    }
    res.status(200).json(review);
  } catch (error) {
    next(new CustomError(error.message || 'Failed to retrieve review', 404));
  }
};

// Create a new review for a post
export const createReview = async (req, res, next) => {
  try {
    const { text } = req.body;
    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    const newReview = new Review({
      text,
      user: userId,
      post: postId,
    });

    await newReview.save();

    res.status(201).json({
      text: newReview.text,
      _id: newReview._id,
      user: req.user,
      post: postId,
    });
  } catch (error) {
    next(new CustomError(error.message || 'Failed to create review', 400));
  }
};

// Update a review by ID
export const updateReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id;
    const updates = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      throw new CustomError('Review not found', 404);
    }
    if (review.user.toString() !== userId) {
      throw new CustomError(
        'Unauthorized access: You do not own this review',
        403
      );
    }

    const updatedReview = await Review.findByIdAndUpdate(reviewId, updates, {
      new: true,
      runValidators: true,
    }).populate('user', 'name email');

    res.status(200).json(updatedReview);
  } catch (error) {
    next(new CustomError(error.message || 'Failed to update review', 400));
  }
};

// Delete a review by ID
export const deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);
    if (!review) {
      throw new CustomError('Review not found', 404);
    }
    if (review.user.toString() !== userId) {
      throw new CustomError(
        'Unauthorized access: You do not own this review',
        403
      );
    }

    await Review.findByIdAndDelete(reviewId);
    res.status(204).json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(new CustomError(error.message || 'Failed to delete review', 400));
  }
};
