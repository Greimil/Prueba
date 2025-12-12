import { Router } from "express";

import cardsRouter from "./api/cards/cards.routes"

const router = Router();

router.use("/", cardsRouter);

export default router;