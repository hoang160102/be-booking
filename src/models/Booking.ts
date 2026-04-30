import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  showtime: mongoose.Types.ObjectId;
  seats: string[];
  totalAmount: number;
  paymentStatus: 'Pending' | 'Paid' | 'Cancelled' | 'Refunded';
  paymentMethod: 'VNPAY' | 'MOMO' | 'Credit Card' | 'Cash';
  bookingCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  showtime: {
    type: Schema.Types.ObjectId,
    ref: 'Showtime',
    required: true,
  },
  seats: [{
    type: String,
    required: true,
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Cancelled', 'Refunded'],
    default: 'Pending',
  },
  paymentMethod: {
    type: String,
    enum: ['VNPAY', 'MOMO', 'Credit Card', 'Cash'],
    required: true,
  },
  bookingCode: {
    type: String,
    unique: true,
    required: true,
  },
}, {
  timestamps: true,
});

// Indexes
bookingSchema.index({ bookingCode: 1 });
bookingSchema.index({ user: 1 });

const Booking: Model<IBooking> = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
