import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INews extends Document {
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  type: 'News' | 'Promotion' | 'Cinema';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new Schema<INews>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['News', 'Promotion', 'Cinema'],
    default: 'News',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const News: Model<INews> = mongoose.model<INews>('News', newsSchema);

export default News;
