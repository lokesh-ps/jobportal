import Company from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body || {};
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    const existingCompany = await Company.findOne({ name: companyName });
    if (existingCompany) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }
    const company = new Company({
      name: companyName,
      userId: req.user.id,
    });
    await company.save();
    res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error in Registering Company", success: false });
  }
};

//get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is required", success: false });
    }
    const companies = await Company.find({ userId: userId });
    if (!companies || companies.length === 0) {
      return res
        .status(404)
        .json({ message: "No companies found", success: false });
    }
    return res.status(200).json({ companies, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error in Fetching Companies", success: false });
  }
};

//get company by id
export const getCompanyById = async (req, res) => {
  try {
    const { id: companyId } = req.params;
    if (!companyId) {
      return res
        .status(400)
        .json({ message: "Company ID is required", success: false });
    }
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error in Fetching Company", success: false });
  }
};

//update company by id
export const updateCompanyById = async (req, res) => {
  try {
    const { id: companyId } = req.params;
    const { name, description, website, location, logo } = req.body;
    if (!companyId) {
      return res
        .status(400)
        .json({ message: "Company ID is required", success: false });
    }
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    const updatedData = {
      name: name || company.name,
      description: description || company.description,
      website: website || company.website,
      location: location || company.location,
      logo: logo || company.logo,
    };
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      updatedData,
      { new: true },
    );
    return res.status(200).json({
      message: "Company updated successfully",
      company: updatedCompany,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error in Updating Company", success: false });
  }
};
