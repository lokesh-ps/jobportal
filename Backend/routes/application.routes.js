import express from "express";
import {
  applyToJob,
  getAppliedJobs,
  getApplicantsForJob,
  updateApplicationStatus,
} from "../controller/application.controller.js";
import authenticateUser from "../middleware/isAuthenticated.js";
const router = express.Router();

router.route("/apply/:id").get(authenticateUser, applyToJob);
router.route("/get").get(authenticateUser, getAppliedJobs);
router.route("/:id/applicants").get(authenticateUser, getApplicantsForJob);
router
  .route("/status/:id/update")
  .put(authenticateUser, updateApplicationStatus);

export default router;
