import User from '../models/usersModel.js';
import { CustomError } from '../utils/errorHandler.js';
import bcrypt from 'bcrypt';
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

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      role,
      image,
    });

    await newUser.save();
    res.status(201).json(newUser); // Password excluded automatically
  } catch (error) {
    next(new CustomError(error.message || 'Failed to create user', 400));
  }
};

// Update user by ID
export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Hash the new password if provided
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw new CustomError('User not found', 404);
    }

    res.status(200).json(updatedUser); // Password excluded automatically
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

// User Login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError('Invalid email or password', 401);
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError('Invalid email or password', 401);
    }

    // Store user information in session
    req.session.userId = user._id; // Store user ID in the session
    req.session.email = user.email; // Optionally store the email

    // Return success response (excluding password)
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    next(new CustomError(error.message || 'Failed to login', 400));
  }
};

// User Logout
export const logoutUser = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(new CustomError('Failed to log out. Please try again.', 500));
    }

    // Clear the session cookie
    res.clearCookie('connect.sid', { path: '/' });

    // Send a success response
    res.status(200).json({ message: 'Logout successful' });
  });
};