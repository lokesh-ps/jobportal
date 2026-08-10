import express from "express";
import {
  postJob,
  getAdminJobs,
  getAllJobs,
  getJobById,
} from "../controller/job.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(authenticateToken, postJob);
router.route("/get").get(authenticateToken, getAllJobs);
router.route("/get/:id").get(authenticateToken, getJobById);
router.route("/getadminjobs").get(authenticateToken, getAdminJobs);

export default router;
