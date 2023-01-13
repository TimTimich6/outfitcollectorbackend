import { Router } from "express";
import * as controller from "../controllers/postcontroller";
import { decodeJWT } from "../middleware/jwt";
const router = Router();

router.post("/", decodeJWT, controller.createPost);
router.get("/post/all", decodeJWT, controller.getAll);
router.get("/post/:id", decodeJWT, controller.getPost);
router.delete("/post/:id", decodeJWT, controller.deletePost);

export default router;
