import mongoose from 'mongoose';
import { User } from '../../types/user.type.js';

export interface UserDocument extends User, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
  }

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,})?$/, 'Email is incorrect'],
    required: true,
  },
  avatarPath: {
    type: String,
    required: false,
    match: [/^[\w-\\.]+?\.(jpg|png)$/, 'avatar is incorrect'],
  },
  name: {
    type: String,
    required: true,
    minlength: [1, 'Min length for name is 1'],
    maxlength: [15, 'Max length for name is 15'],
  },
  type: String,
}, {
    timestamps: true,
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);