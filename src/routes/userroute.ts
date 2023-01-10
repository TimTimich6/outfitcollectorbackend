import { Router } from "express";
import * as controller from "../controllers/usercontroller";
import { decodeJWT } from "../middleware/jwt";
const router = Router();

router.get("/block/:id", controller.getBlocks);

router.post("/block/:id", controller.blockId);
router.post("/signin", controller.login);
router.post("/", controller.createUser);
router.get("/account/:id", decodeJWT, controller.getAccount);

export default router;
