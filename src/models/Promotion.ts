import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPromotion extends Document {
  title: string;
  description: string;
  discountPercent: number;
  startDate: Date;
  endDate: Date;
  code: string;
  bannerUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const promotionSchema = new Schema<IPromotion>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  discountPercent: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  bannerUrl: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Promotion: Model<IPromotion> = mongoose.model<IPromotion>('Promotion', promotionSchema);

export default Promotion;
