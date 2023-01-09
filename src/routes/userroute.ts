import { Router } from "express";
import * as controller from "../controllers/usercontroller";
const router = Router();

router.get("/change/:id", controller.changeId);

router.get("/block/:id", controller.getBlocks);

router.post("/block/:id", controller.blockId);
router.post("/signin", controller.login);
router.post("/", controller.createUser);

export default router;
