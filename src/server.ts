import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoute from "./routes/userroute";
import postRoute from "./routes/postroute";

import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import path from "path";
console.log(path.join(__dirname, "public", "html"));
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3080;
app.use(express.json({ limit: "200mb" }));

app.use(cors());
app.use(morgan("dev"));

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "home.html"));
});
app.get("/eula", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "eula.html"));
});

app.get("/privacy", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "privacy.html"));
});

app.get("/support", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "support.html"));
});

server.listen(PORT, () => {
  console.log("listening on port", PORT);
});
export const io = new Server(server, { cors: { origin: "*" } });
const uri: string = `mongodb+srv://tim:${process.env.MONGOPASS}@cluster0.k1aaw.mongodb.net/outfitapp?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { autoIndex: true })
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.error(err);
    console.log("connected to db");
  });
mongoose.set("runValidators", true);
mongoose.set("strictQuery", false);
