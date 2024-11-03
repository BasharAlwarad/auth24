import User from '../models/usersModel.js';
import { CustomError } from '../utils/errorHandler.js';

// Get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(new CustomError('Failed to retrieve users', 404));
  }
};

// Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    res.status(200).json(user);
  } catch (error) {
    next(new CustomError(error.message || 'Failed to retrieve user', 404));
  }
};

// Create a new user
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role, image } = req.body;

    const newUser = new User({
      name,
      email,
      password,
      role,
      image,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(new CustomError(error.message || 'Failed to create user', 400));
  }
};

// Update user by ID
export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw new CustomError('User not found', 404);
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(new CustomError(error.message || 'Failed to update user', 400));
  }
};

// Delete user by ID
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new CustomError('User not found', 404);
    }

    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(new CustomError(error.message || 'Failed to delete user', 400));
  }
};
