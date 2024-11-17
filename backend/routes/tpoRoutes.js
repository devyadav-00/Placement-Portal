import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getPendingTNPs, handleTNPRequest, loginTPO, logoutTPO, registerTPO } from "../controllers/tpoController.js";

const router = express.Router();

router.post("/registerTPO", registerTPO);
router.post("/loginTPO", loginTPO);
router.get("/logoutTPO", isAuthenticated, logoutTPO);
router.post("/tnp-request", isAuthenticated, authorizeRoles("TPO"), handleTNPRequest);
router.get("/pending-tnps", isAuthenticated, authorizeRoles("TPO"), getPendingTNPs);
    
export default router;