import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export function decodeJWT(req: any, res: Response, next: NextFunction) {
  const decoded = jwt.verify(req.headers.Authorization, <string>process.env.JWT);
  console.log(decoded);
}
