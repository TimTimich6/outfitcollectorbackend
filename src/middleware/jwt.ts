import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export function decodeJWT(req: any, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  console.log(token);

  if (token) {
    jwt.verify(token, <string>process.env.JWT, async (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({ status: false });
      } else {
        console.log("token", decoded);
        req._id = decoded._id;
        req.username = decoded.username;
        next();
      }
    });
  } else {
    res.status(403).json({ status: false });
  }
}
