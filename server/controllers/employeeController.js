import Employee, { STATUS_VALUES } from "../models/Employee.js";
import {
  deleteCloudinaryAsset,
  uploadEmployeeImage,
} from "../middleware/cloudinaryConfig.js";

const parseBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }
  return undefined;
};

const sanitizeEmployeePayload = (body) => {
  const allowedFields = [
    "name",
    "designation",
    "status",
    "joinDate",
    "leaveDate",
    "description",
    "featured",
    "displayOrder",
    "isActive",
  ];

  const sanitized = allowedFields.reduce((acc, key) => {
    if (body[key] !== undefined && body[key] !== null && body[key] !== "") {
      acc[key] = body[key];
    }
    return acc;
  }, {});

  if (sanitized.status === "previous") {
    sanitized.status = "past";
  }

  return sanitized;
};

const normalizeDisplayOrder = (value) => {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const validateStatus = (status) => {
  if (!status) return undefined;
  const normalizedStatus = status === "previous" ? "past" : status;
  if (!STATUS_VALUES.includes(normalizedStatus)) {
    const error = new Error(
      `Status must be one of: ${STATUS_VALUES.join(", ")}`
    );
    error.statusCode = 400;
    throw error;
  }
  return normalizedStatus;
};

const respondWithError = (
  res,
  error,
  defaultMessage = "Something went wrong"
) => {
  const status = error.statusCode || error.status || 500;
  return res.status(status).json({
    success: false,
    message: error.message || defaultMessage,
    details: error.details,
  });
};

export const getEmployees = async (req, res) => {
  try {
    const { status, includeInactive, isActive } = req.query;
    const filter = {};

    if (status) {
      const statuses = status
        .split(",")
        .map((s) => (s.trim() === "previous" ? "past" : s.trim()));
      const invalid = statuses.filter(
        (value) => !STATUS_VALUES.includes(value)
      );
      if (invalid.length) {
        return res.status(400).json({
          success: false,
          message: `Invalid status values: ${invalid.join(", ")}`,
        });
      }
      filter.status = { $in: statuses };
    }

    const explicitActiveFlag = parseBoolean(isActive);
    if (explicitActiveFlag !== undefined) {
      filter.isActive = explicitActiveFlag;
    } else {
      const includeInactiveFlag = parseBoolean(includeInactive);
      if (includeInactiveFlag !== true) {
        filter.isActive = true;
      }
    }

    const employees = await Employee.find(filter)
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean({ virtuals: true });

    return res.json({
      success: true,
      message: "Employees fetched successfully",
      employees,
      count: employees.length,
    });
  } catch (error) {
    console.error("getEmployees error:", error);
    return respondWithError(res, error, "Unable to fetch employees");
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id).lean({ virtuals: true });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.json({
      success: true,
      message: "Employee fetched successfully",
      employee,
    });
  } catch (error) {
    console.error("getEmployeeById error:", error);
    return respondWithError(res, error, "Unable to fetch employee");
  }
};

export const createEmployee = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      uploadEmployeeImage(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Employee photo is required",
      });
    }

    const payload = sanitizeEmployeePayload(req.body);
    const normalizedStatus = validateStatus(payload.status);
    if (normalizedStatus) {
      payload.status = normalizedStatus;
    }

    payload.joinDate = payload.joinDate
      ? new Date(payload.joinDate)
      : undefined;
    payload.leaveDate = payload.leaveDate
      ? new Date(payload.leaveDate)
      : undefined;
    payload.displayOrder = normalizeDisplayOrder(payload.displayOrder) ?? 0;
    payload.featured = payload.featured ? payload.featured === "true" : false;
    payload.isActive = payload.isActive ? payload.isActive === "true" : true;
    payload.photo = req.file.path;
    payload.photoPublicId = req.file.filename;

    const employee = await Employee.create(payload);

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    console.error("createEmployee error:", error);
    return respondWithError(res, error, "Unable to create employee");
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    await new Promise((resolve, reject) => {
      uploadEmployeeImage(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const updates = sanitizeEmployeePayload(req.body);
    const normalizedStatus = validateStatus(updates.status);
    if (normalizedStatus) {
      updates.status = normalizedStatus;
    }

    if (updates.joinDate) updates.joinDate = new Date(updates.joinDate);
    if (updates.leaveDate) updates.leaveDate = new Date(updates.leaveDate);

    if (updates.featured !== undefined) {
      updates.featured =
        updates.featured === true || updates.featured === "true";
    }
    if (updates.isActive !== undefined) {
      updates.isActive =
        updates.isActive === true || updates.isActive === "true";
    }

    const normalizedDisplayOrder = normalizeDisplayOrder(updates.displayOrder);
    if (normalizedDisplayOrder !== undefined) {
      updates.displayOrder = normalizedDisplayOrder;
    } else {
      delete updates.displayOrder;
    }

    if (req.file) {
      if (employee.photoPublicId) {
        await deleteCloudinaryAsset(employee.photoPublicId);
      }
      updates.photo = req.file.path;
      updates.photoPublicId = req.file.filename;
    }

    Object.assign(employee, updates);
    await employee.save();

    return res.json({
      success: true,
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    console.error("updateEmployee error:", error);
    return respondWithError(res, error, "Unable to update employee");
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (employee.photoPublicId) {
      await deleteCloudinaryAsset(employee.photoPublicId);
    }

    await employee.deleteOne();

    return res.json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("deleteEmployee error:", error);
    return respondWithError(res, error, "Unable to delete employee");
  }
};

export const toggleEmployeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    employee.isActive = !employee.isActive;

    if (!employee.isActive && employee.status === "current") {
      employee.status = "past";
      if (!employee.leaveDate) {
        employee.leaveDate = new Date();
      }
    }

    await employee.save();

    return res.json({
      success: true,
      message: `Employee ${
        employee.isActive ? "activated" : "deactivated"
      } successfully`,
      employee,
    });
  } catch (error) {
    console.error("toggleEmployeeStatus error:", error);
    return respondWithError(res, error, "Unable to toggle employee status");
  }
};
