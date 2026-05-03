import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Counter from './Counter';

export interface IUser extends Document {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: 0 | 1 | 2;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
  gender: 0 | 1;
}

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  gender: {
    type: Number,
    enum: [0, 1], //0: male, 1: female
    default: 0,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,
  },
  phone: {
    type: String,
    unique: true,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  role: {
    type: Number,
    enum: [0, 1, 2], //0: user, 1: staff, 2: admin
  },
  avatar: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

// Auto-increment logic
userSchema.pre('save', async function () {
  if (!this.isNew) {
    return;
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { id: 'userId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    if (counter) {
      this.userId = counter.seq;
    }
  } catch (error: any) {
    throw error;
  }
});

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
