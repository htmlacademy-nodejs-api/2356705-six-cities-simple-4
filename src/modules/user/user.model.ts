import mongoose from 'mongoose';
import { User } from '../../types/user.type.js';
import { UserType } from '../../types/user-type.enum.js';

export interface UserDocument extends User, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
  }

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [1, 'Min length for name is 1'],
    maxlength: [15, 'Max length for name is 15'],
  },
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
  type: {
    type: String,
    required: true,
    enum: Object.values(UserType),
  },
}, {
    timestamps: true,
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);