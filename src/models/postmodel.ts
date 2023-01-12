import { Binary } from "mongodb";
import mongoose from "mongoose";

interface Post {
  createdAt: Date;
  createdBy: mongoose.Schema.Types.ObjectId;
  likedBy: mongoose.Schema.Types.ObjectId[];
  description: string;
  s3location: string;
}

const postSchema = new mongoose.Schema<Post>({
  createdAt: {
    type: Date,
    default: () => new Date(),
    imutable: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "true",
    imutable: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  s3location: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  likedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
});

export default mongoose.model<Post>("Post", postSchema);
