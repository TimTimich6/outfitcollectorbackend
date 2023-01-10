import mongoose from "mongoose";

interface User {
  createdAt?: Date;
  blocked: mongoose.Schema.Types.ObjectId[];
  username: string;
  password: string;
  email: string;
  following: mongoose.Schema.Types.ObjectId[];
  followers: mongoose.Schema.Types.ObjectId[];
  posts: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<User>({
  createdAt: {
    type: Date,
    default: () => new Date(),
    imutable: true,
  },
  blocked: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "Post",
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    // match: [/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/, "Please enter a valid email"],
  },
});

export default mongoose.model<User>("User", userSchema);
