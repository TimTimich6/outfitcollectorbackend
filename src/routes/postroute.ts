import { Router } from "express";
import * as controller from "../controllers/postcontroller";
import { decodeJWT } from "../middleware/jwt";
const router = Router();

router.post("/", decodeJWT, controller.createUser);

export default router;
