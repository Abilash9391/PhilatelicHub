import express from "express";
import { newsubscribe } from "../controller/newsController.js";

const router = express.Router();

router.post("/newsubscribe", newsubscribe);

export default router;
