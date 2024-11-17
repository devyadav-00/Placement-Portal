import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getPendingTNPs, handleTNPRequest, loginTPO, logoutTPO, registerTPO } from "../controllers/tpoController.js";
import { authorizeRoles } from "../middlewares/tpoAuth.js";

const router = express.Router();

router.post("/register", registerTPO);
router.post("/login", loginTPO);
router.get("/logout", isAuthenticated, logoutTPO);
router.post("/tnp-request", isAuthenticated, authorizeRoles("TPO"), handleTNPRequest);
router.get("/pending-tnps", isAuthenticated, authorizeRoles("TPO"), getPendingTNPs);
    
export default router;