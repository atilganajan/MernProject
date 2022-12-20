import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);

router.get("/me", userController.getMe);

export default router;
