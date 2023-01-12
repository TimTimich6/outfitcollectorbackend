import { Request, Response } from "express";
import User from "../models/usermodel";
import Post from "../models/postmodel";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: "AKIA4LZKO6L6ZDQRD5NF",
  secretAccessKey: "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",
});

export async function createPost(req: any, res: Response) {
  const body = req.body;
  const { b64, description } = body;
  try {
    const buffer = Buffer.from(b64, "base64");
    const uploadedImage = await s3
      .upload({
        Bucket: <string>process.env.S3_BUCKETNAME,
        Key: `${Date.now().toString()}.jpg`,
        Body: buffer,
      })
      .promise();
    if (uploadedImage) {
      const post = new Post({ s3location: uploadedImage.Key, description, createdBy: req._id });
      await post.save();
      await User.findOneAndUpdate({ _id: req._id }, { $push: { posts: post._id } });
      return res.json({ message: "posted", post: post._id });
    } else throw "didn't upload";
  } catch (error) {
    console.log(error);
    res.status(401).json({ error, message: "Can't register a user with given fields " });
  }
}

export async function getPost(req: any, res: Response) {
  const id = req.params.id;
  try {
    const post = await Post.findOne({ _id: id }).populate("createdBy", "username -_id").select("-likedBy").lean();
    if (post) {
      res.json(post);
    }
    // res.json({ message: "posted", post: post._id });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error, message: "Can't register a user with given fields " });
  }
}

export async function getAll(req: any, res: Response) {
  try {
    const posts = await Post.find({}).select("-desc -createdAt -createdBy").limit(20).lean();
    if (posts) {
      // const parsed = posts.map(post=>Buffer.toString())
      res.json(posts);
    }
    // res.json({ message: "posted", post: post._id });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error, message: "Can't register a user with given fields " });
  }
}
