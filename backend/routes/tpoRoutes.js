import express from "express";
import { isAuthenticatedTPO } from "../middlewares/auth.js";
import { getPendingTNPs, getTPO, handleTNPRequest, loginTPO, logoutTPO, registerTPO } from "../controllers/tpoController.js";
import { authorizeRoles } from "../middlewares/tpoAuth.js";

const router = express.Router();

router.post("/register", registerTPO);
router.post("/login", loginTPO);
router.get("/logout", isAuthenticatedTPO, logoutTPO);
router.get("/me", isAuthenticatedTPO, getTPO);
router.post(
  "/tnp-request",
  isAuthenticatedTPO,
  authorizeRoles("TPO"),
  handleTNPRequest
);
router.get(
  "/pending-tnps",
  isAuthenticatedTPO,
  authorizeRoles("TPO"),
  getPendingTNPs
);
    
export default router;