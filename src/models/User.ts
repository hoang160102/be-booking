import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  phone: string;
  role: 'user' | 'admin';
  points: number;
  membershipLevel: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
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
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  points: {
    type: Number,
    default: 0,
  },
  membershipLevel: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Diamond'],
    default: 'Bronze',
  },
  avatar: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Indexes
userSchema.index({ email: 1 });

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
