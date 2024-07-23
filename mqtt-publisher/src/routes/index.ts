import { Router } from "express";
import { publishMessage } from "../controllers/publisherController";

const router = Router();

router.post("/publish", publishMessage);

export default router;
