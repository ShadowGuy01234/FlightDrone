import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import slugify from "slugify";

// Create job
export const createJobController = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      jobType,
      experience,
      salary,
      applicationDeadline,
    } = req.body;

    // Validation
    if (!title) {
      return res.status(400).send({ message: "Job title is required" });
    }
    if (!description) {
      return res.status(400).send({ message: "Job description is required" });
    }
    if (!requirements) {
      return res.status(400).send({ message: "Job requirements are required" });
    }
    if (!location) {
      return res.status(400).send({ message: "Job location is required" });
    }
    if (!jobType) {
      return res.status(400).send({ message: "Job type is required" });
    }
    if (!experience) {
      return res
        .status(400)
        .send({ message: "Experience requirement is required" });
    }

    const job = new Job({
      title,
      description,
      requirements,
      location,
      jobType,
      experience,
      salary,
      applicationDeadline,
      postedBy: req.user.id,
    });

    await job.save();
    res.status(201).send({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating job",
    });
  }
};

// Get all jobs
export const getJobsController = async (req, res) => {
  try {
    const { isActive } = req.query;
    let filter = {};
    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    const jobs = await Job.find(filter)
      .populate("postedBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      countTotal: jobs.length,
      message: "All Jobs",
      jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting jobs",
      error: error.message,
    });
  }
};

// Get single job
export const getSingleJobController = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name");
    if (!job) {
      return res.status(404).send({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Single Job Fetched",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single job",
      error,
    });
  }
};

// Update job
export const updateJobController = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      jobType,
      experience,
      salary,
      applicationDeadline,
      isActive,
    } = req.body;

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        requirements,
        location,
        jobType,
        experience,
        salary,
        applicationDeadline,
        isActive,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Job Updated Successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating job",
    });
  }
};

// Delete job
export const deleteJobController = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Job Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting job",
      error,
    });
  }
};

// Create job application
export const createJobApplicationController = async (req, res) => {
  try {
    const { jobId, applicantName, email, phone, position, description } =
      req.body;

    // Validation
    if (!jobId) {
      return res.status(400).send({ message: "Job ID is required" });
    }
    if (!applicantName) {
      return res.status(400).send({ message: "Applicant name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone number is required" });
    }
    if (!position) {
      return res.status(400).send({ message: "Position is required" });
    }
    if (!description) {
      return res.status(400).send({ message: "Description is required" });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).send({
        success: false,
        message: "Job not found",
      });
    }

    // Check if job is active
    if (!job.isActive) {
      return res.status(400).send({
        success: false,
        message: "Job is no longer active",
      });
    }

    const application = new JobApplication({
      jobId,
      applicantName,
      email,
      phone,
      position,
      description,
    });

    await application.save();
    res.status(201).send({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in submitting application",
    });
  }
};

// Get all job applications
export const getJobApplicationsController = async (req, res) => {
  try {
    const { jobId, status } = req.query;
    let filter = {};

    if (jobId) {
      filter.jobId = jobId;
    }
    if (status) {
      filter.status = status;
    }

    const applications = await JobApplication.find(filter)
      .populate("jobId", "title position")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      countTotal: applications.length,
      message: "All Job Applications",
      applications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting job applications",
      error: error.message,
    });
  }
};

// Update job application status
export const updateJobApplicationStatusController = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const application = await JobApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("jobId", "title");

    res.status(200).send({
      success: true,
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating application status",
    });
  }
};

// Delete job application
export const deleteJobApplicationController = async (req, res) => {
  try {
    await JobApplication.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Job application deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting job application",
      error,
    });
  }
};
