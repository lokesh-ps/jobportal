import express from "express";
import {
  registerCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
} from "../controller/company.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(authenticateToken, registerCompany);
router.route("/all").get(authenticateToken, getAllCompanies);
router.route("/get/:id").get(authenticateToken, getCompanyById);
router.route("/update/:id").put(authenticateToken, updateCompanyById);

export default router;
