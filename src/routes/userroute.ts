import { Router } from "express";
import * as controller from "../controllers/usercontroller";
import { decodeJWT } from "../middleware/jwt";
const router = Router();

router.get("/change/:id", controller.changeId);

router.get("/block/:id", controller.getBlocks);

router.post("/block/:id", controller.blockId);
router.post("/signin", controller.login);
router.post("/", controller.createUser);
router.get("/", decodeJWT, controller.sample);

export default router;
