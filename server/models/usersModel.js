import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      //   unique: true,
      //   match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // Regex for email validation
    },
    password: {
      type: String,
      required: true,
      //   minlength: 8,
      //   maxlength: 16,
      //   match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      // This regex enforces:
      // - At least one lowercase letter
      // - At least one uppercase letter
      // - At least one number
      // - At least one special character from @$!%*?&
      // - Length between 8 and 16 characters
    },
    role: { type: String, default: 'user' },
    image: {
      type: String,
      default:
        'https://img.freepik.com/free-vector/blank-user-circles_78370-4336.jpg?t=st=1730619736~exp=1730623336~hmac=30fb9e6e2b2fa0c8f1d7a2a66de13f0de464aedebb95b041e6e2603babe9c386&w=1380',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret.password; // Exclude password
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret.password; // Exclude password
        return ret;
      },
    },
  }
);

export default mongoose.model('User', userSchema);
