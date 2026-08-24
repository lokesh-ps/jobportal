import express from "express";
import {
  registerCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
} from "../controller/company.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();

router.route("/register").post(authenticateToken, registerCompany);
router.route("/all").get(authenticateToken, getAllCompanies);
router.route("/get/:id").get(authenticateToken, getCompanyById);
router
  .route("/update/:id")
  .put(authenticateToken, singleUpload, updateCompanyById);

export default router;
