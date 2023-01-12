import { Request, Response } from "express";
import User from "../models/usermodel";
import jwt from "jsonwebtoken";

export async function createUser(req: Request, res: Response) {
  const body = req.body;
  console.log(body);
  const { email, password, username } = body;
  try {
    const user = new User({ email, password, username });
    const doc = await user.save();
    const signed = jwt.sign({ _id: user._id, username }, <string>process.env.JWT);
    res.setHeader("Authorization", signed);
    res.json({ username, id: user._id });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error, message: "Can't register a user with given fields " });
  }
}

export async function login(req: any, res: any) {
  const body = req.body;
  console.log(body);
  const { password, username } = body;
  try {
    const found = await User.findOne({ password, username });
    if (found) {
      const signed = jwt.sign({ _id: found._id, username }, <string>process.env.JWT);
      res.setHeader("Authorization", signed);
      res.json({ username, id: found._id });
    } else throw "Either username or password is wrong";
  } catch (error) {
    console.log(error);
    res.status(401).json({ error, message: "Username and password don't match" });
  }
}

export async function getAccount(req: any, res: any) {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).populate("posts", "s3location likedBy").select("-password -email -blocked").lean();
    res.json(user);
  } catch (error) {
    res.status(401).json({ error, message: "Failed to find user" });
  }
}

export async function blockId(req: any, res: any) {
  try {
    const id = req.params.id;
    const auth = req.headers.auth;
    const found = await User.findOne({ _id: auth });
    if (found) {
      found.blocked.push(id);
      await found.save();
      return res.json({ message: "succesfully added to block list" });
    }
    throw "couldn't find";
  } catch (error) {
    res.status(401).json({ error, message: "User was not found" });
  }
}

export async function getBlocks(req: any, res: any) {
  try {
    const auth = req.params.id;
    const found = await User.findOne({ _id: auth }).select("blocked -_id").lean();
    if (found) {
      return res.json(found.blocked);
    }
    throw "couldn't find";
  } catch (error) {
    res.status(401).json({ error, message: "User was not found" });
  }
}
