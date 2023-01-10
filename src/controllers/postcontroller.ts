import { Request, Response } from "express";
import User from "../models/usermodel";
import Post from "../models/postmodel";
export async function createUser(req: any, res: Response) {
  const body = req.body;
  console.log(body);
  const { b64, description } = body;
  try {
    const post = new Post({ b64, description, createdBy: req._id });
    await post.save();
    await User.findOneAndUpdate({ _id: req._id }, { $push: { posts: post._id } });
    res.json({ message: "posted", post: post._id });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error, message: "Can't register a user with given fields " });
  }
}
