import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
export const applyToJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const userId = req.user.id;
    if (!jobId || !userId) {
      return res.status(400).json({
        message: "Job ID and User ID are required",
        success: false,
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    const existingApplication = await Application.findOne({
      job: jobId,
      user: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "User has already applied to this job",
        success: false,
      });
    }
    const application = new Application({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(application._id);
    await job.save();
    await application.save();
    res.status(200).json({
      message: "Applied to job successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server Error in Applying to Job",
      success: false,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
        success: false,
      });
    }
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company" },
      });
    if (!applications) {
      return res.status(404).json({
        message: "No applied jobs found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Applied jobs retrieved successfully",
      success: true,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server Error in Retrieving Applied Jobs",
      success: false,
    });
  }
};

export const getApplicantsForJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    const applicants = job.applications.map(
      (application) => application.applicant,
    );
    res.status(200).json({
      message: "Applicants retrieved successfully",
      success: true,
      data: applicants,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error in Retrieving Applicants",
      success: false,
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;
    if (!applicationId) {
      return res.status(400).json({
        message: "Application ID is required",
        success: false,
      });
    }
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }
    const application = await Application.findById({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }
    application.status = status;
    await application.save();
    res.status(200).json({
      message: "Application status updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server Error in Updating Application Status",
      success: false,
    });
  }
};
