import Job from "../models/job.model.js";
import Company from "../models/company.model.js";

export const postJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      title,
      description,
      requirements,
      location,
      salary,
      experience,
      jobType,
      companyId,
      position,
      created_by,
    } = req.body;
    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !salary ||
      !experience ||
      !jobType ||
      !companyId ||
      !position ||
      !created_by
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
        success: false,
      });
    }
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(",").map((req) => req.trim()),
      location,
      salary: Number(salary),
      experience: Number(experience),
      jobType,
      company: companyId,
      position,
      created_by: userId,
    });
    res.status(201).json({
      message: "Job posted successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error in Posting Job:", error);
    res.status(500).json({
      message: error.message || "Server Error in Posting Job",
      success: false,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    //keyword search
    // const { location, jobType, experience } = req.query;
    const keyword = req.query.keyword || "";
    console.log("keyword:", keyword);
    const query = {
      $or: [
        {
          title: { $regex: keyword, $options: "i" },
        },
        {
          description: { $regex: keyword, $options: "i" },
        },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }
    res.status(200).json({
      message: "All Jobs retrieved successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server Error in Retrieving Jobs",
      success: false,
    });
  }
};
export const getJobById = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
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
    res.status(200).json({
      message: "Job by ID retrieved successfully",
      job,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error in Retrieving Job",
      success: false,
    });
  }
};

//admin job created
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.user.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found for this admin",
        success: false,
      });
    }
    res.status(200).json({
      message: "Admin Jobs retrieved successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error in Retrieving Admin Jobs",
      success: false,
    });
  }
};
