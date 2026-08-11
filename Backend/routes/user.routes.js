import express from "express";
import {
  registerUser,
  loginUser,
  updateProfile,
  logoutUser,
} from "../controller/user.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/profile/update").put(authenticateToken, updateProfile);

export default router;
