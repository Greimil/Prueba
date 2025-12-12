import { Router } from "express";
import {
  GETcardsController,
  POSTcardController,
  DELETEcardController,
  PUTcardController,
} from "./cards.controller";
import { POSTvalidateCards } from "./cards.middlewares";
const router = Router();

router.get("/cards", GETcardsController);

router.post("/cards", POSTvalidateCards, POSTcardController);

router.delete("/cards/:id", DELETEcardController);

router.put("/cards/:id", PUTcardController);

export default router;
