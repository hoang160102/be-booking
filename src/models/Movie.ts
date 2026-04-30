import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  slug: string;
  description: string;
  duration: number; // in minutes
  releaseDate: Date;
  genres: string[];
  director: string;
  cast: string[];
  trailerUrl: string;
  posterUrl: string;
  format: ('2D' | '3D' | 'IMAX')[];
  censorship: 'P' | 'T13' | 'T16' | 'T18';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const movieSchema = new Schema<IMovie>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  genres: [{
    type: String,
  }],
  director: {
    type: String,
    required: true,
  },
  cast: [{
    type: String,
  }],
  trailerUrl: {
    type: String,
    default: '',
  },
  posterUrl: {
    type: String,
    required: true,
  },
  format: [{
    type: String,
    enum: ['2D', '3D', 'IMAX'],
    default: ['2D'],
  }],
  censorship: {
    type: String,
    enum: ['P', 'T13', 'T16', 'T18'],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Indexes
movieSchema.index({ slug: 1 });
movieSchema.index({ title: 'text' });

const Movie: Model<IMovie> = mongoose.model<IMovie>('Movie', movieSchema);

export default Movie;
