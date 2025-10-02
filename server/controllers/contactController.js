import Contact from "../models/Contact.js";
import {
  sendContactNotificationEmail,
  sendContactConfirmationEmail,
} from "../config/emailConfig.js";

// Submit contact form (public endpoint)
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    // Get IP address and user agent for tracking
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get("user-agent") || "";

    // Create new contact
    const contact = new Contact({
      name,
      email,
      phone,
      message,
      ipAddress,
      userAgent,
    });

    await contact.save();

    // Send email notifications (don't wait for them to complete)
    const contactData = { name, email, phone, message };

    // Send notification to admin
    sendContactNotificationEmail(contactData).catch((error) =>
      console.error("Failed to send admin notification:", error)
    );

    // Send confirmation to user
    sendContactConfirmationEmail(contactData).catch((error) =>
      console.error("Failed to send user confirmation:", error)
    );

    res.status(201).send({
      success: true,
      message: "Thank you for contacting us! We'll get back to you soon.",
      contact: {
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).send({
      success: false,
      message: "Error submitting contact form",
      error: error.message,
    });
  }
};

// Get all contacts (admin only)
export const getAllContacts = async (req, res) => {
  try {
    const {
      status,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const query = status ? { status } : {};
    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    const contacts = await Contact.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Contact.countDocuments(query);

    // Get status counts
    const statusCounts = await Contact.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const stats = {
      total,
      new: statusCounts.find((s) => s._id === "new")?.count || 0,
      read: statusCounts.find((s) => s._id === "read")?.count || 0,
      responded: statusCounts.find((s) => s._id === "responded")?.count || 0,
      resolved: statusCounts.find((s) => s._id === "resolved")?.count || 0,
    };

    res.status(200).send({
      success: true,
      contacts,
      stats,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching contacts",
      error: error.message,
    });
  }
};

// Get single contact (admin only)
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).send({
        success: false,
        message: "Contact not found",
      });
    }

    // Mark as read if status is new
    if (contact.status === "new") {
      contact.status = "read";
      await contact.save();
    }

    res.status(200).send({
      success: true,
      contact,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching contact",
      error: error.message,
    });
  }
};

// Update contact status (admin only)
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    if (!["new", "read", "responded", "resolved"].includes(status)) {
      return res.status(400).send({
        success: false,
        message: "Invalid status value",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status, adminNotes: adminNotes || "" },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).send({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Contact updated successfully",
      contact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).send({
      success: false,
      message: "Error updating contact",
      error: error.message,
    });
  }
};

// Delete contact (admin only)
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).send({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).send({
      success: false,
      message: "Error deleting contact",
      error: error.message,
    });
  }
};

// Get contact statistics (admin only)
export const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $facet: {
          statusCounts: [
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 },
              },
            },
          ],
          recentContacts: [
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
            {
              $project: {
                name: 1,
                email: 1,
                status: 1,
                createdAt: 1,
              },
            },
          ],
          totalCount: [{ $count: "total" }],
        },
      },
    ]);

    res.status(200).send({
      success: true,
      stats: stats[0],
    });
  } catch (error) {
    console.error("Error fetching contact stats:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching contact stats",
      error: error.message,
    });
  }
};
