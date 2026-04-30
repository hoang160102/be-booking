import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IShowtime extends Document {
  movie: mongoose.Types.ObjectId;
  room: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  format: '2D' | '3D' | 'IMAX';
  prices: {
    standard: number;
    vip: number;
    sweetbox: number;
  };
  bookedSeats: string[]; // e.g., ["A1", "A2"]
  createdAt: Date;
  updatedAt: Date;
}

const showtimeSchema = new Schema<IShowtime>({
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  format: {
    type: String,
    enum: ['2D', '3D', 'IMAX'],
    required: true,
  },
  prices: {
    standard: { type: Number, required: true },
    vip: { type: Number, required: true },
    sweetbox: { type: Number, required: true },
  },
  bookedSeats: [{
    type: String,
  }],
}, {
  timestamps: true,
});

// Indexes for faster lookups
showtimeSchema.index({ movie: 1, startTime: 1 });
showtimeSchema.index({ room: 1, startTime: 1 });

const Showtime: Model<IShowtime> = mongoose.model<IShowtime>('Showtime', showtimeSchema);

export default Showtime;
