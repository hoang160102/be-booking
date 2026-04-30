import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISeatConfig {
  row: string;
  number: number;
  type: 'Standard' | 'VIP' | 'Sweetbox';
}

export interface IRoom extends Document {
  name: string;
  roomType: 'Standard' | 'IMAX' | 'Gold Class';
  totalSeats: number;
  layout: ISeatConfig[];
  createdAt: Date;
  updatedAt: Date;
}

const seatConfigSchema = new Schema<ISeatConfig>({
  row: { type: String, required: true },
  number: { type: Number, required: true },
  type: {
    type: String,
    enum: ['Standard', 'VIP', 'Sweetbox'],
    default: 'Standard',
  },
}, { _id: false });

const roomSchema = new Schema<IRoom>({
  name: {
    type: String,
    required: [true, 'Room name is required'],
    unique: true,
    trim: true,
  },
  roomType: {
    type: String,
    enum: ['Standard', 'IMAX', 'Gold Class'],
    default: 'Standard',
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  layout: [seatConfigSchema],
}, {
  timestamps: true,
});

const Room: Model<IRoom> = mongoose.model<IRoom>('Room', roomSchema);

export default Room;
