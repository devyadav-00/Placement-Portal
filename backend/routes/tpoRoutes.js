import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { loginTPO, logoutTPO, registerTPO } from "../controllers/tpoController.js";

const router = express.Router();

router.post("/registerTPO", registerTPO);
router.post("/loginTPO", loginTPO);
router.get("/logoutTPO", isAuthenticated, logoutTPO);

export default router;