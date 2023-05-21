import mongoose from 'mongoose';
import { Offer } from '../../types/offer.type.js';
import { CityEnum } from '../../types/city.enum.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { Comfort } from '../../types/comfort.enum.js';

export interface OfferDocument extends Offer, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
  }

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [10, 'Min length for name is 10'],
    maxlength: [20, 'Max length for name is 20'],
  },
  description: {
    type: String,
    required: true,
    minlength: [20, 'Min length for name is 20'],
    maxlength: [1024, 'Max length for name is 1024'],
  },
  postDate: {
    type: Date,
    required: true,
  },
  city: {
    type: String,
    required: true,
    enum: Object.values(CityEnum),
  },
  previewImage: {
    type: String,
    required: true,
  },
  photos: {
    type: Array,
    required: true,
  },
  premiumFlag: {
    type: Boolean,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(OfferType),
  },
  rooms: {
    type: Number,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  comfort: {
    type: Array,
    required: true,
    enum: Object.values(Comfort),
  },
  user: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
  },
  coordinates: {
    type: String,
  },
}, {
    timestamps: true,
});

export const OfferModel = mongoose.model<OfferDocument>('Offer', offerSchema);
