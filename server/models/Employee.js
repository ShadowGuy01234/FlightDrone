import mongoose from "mongoose";

const STATUS_VALUES = ["current", "past"];

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
      minlength: [2, "Designation must be at least 2 characters"],
      maxlength: [100, "Designation cannot exceed 100 characters"],
    },
    status: {
      type: String,
      enum: {
        values: STATUS_VALUES,
        message: "Status must be current or past",
      },
      required: [true, "Employee status is required"],
      default: "current",
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    photo: {
      type: String,
      required: [true, "Employee photo is required"],
      validate: {
        validator: (value) =>
          /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(value),
        message: "Please provide a valid image URL",
      },
    },
    photoPublicId: {
      type: String,
      required: [true, "Cloudinary public id is required"],
    },
    joinDate: {
      type: Date,
      required: [true, "Join date is required"],
      validate: {
        validator(value) {
          return value <= new Date();
        },
        message: "Join date cannot be in the future",
      },
    },
    leaveDate: {
      type: Date,
      validate: {
        validator(value) {
          if (!value || !this.joinDate) return true;
          return value >= this.joinDate;
        },
        message: "Leave date cannot be before join date",
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    displayOrder: {
      type: Number,
      default: 0,
      min: [0, "Display order cannot be negative"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const buildTenureString = (joinDate, leaveDate) => {
  const start = new Date(joinDate);
  const end = leaveDate ? new Date(leaveDate) : new Date();
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "";

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (end.getDate() < start.getDate()) {
    months -= 1;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (remainingMonths > 0)
    parts.push(`${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`);

  return parts.length ? parts.join(" ") : "Less than a month";
};

employeeSchema.virtual("tenure").get(function tenureGetter() {
  if (!this.joinDate) return "";
  return buildTenureString(this.joinDate, this.leaveDate);
});

employeeSchema.pre("validate", function validateLeave(next) {
  if (this.status === "previous") {
    this.status = "past";
  }
  if (this.leaveDate && this.joinDate && this.leaveDate < this.joinDate) {
    this.invalidate("leaveDate", "Leave date cannot be before join date");
  }
  next();
});

employeeSchema.index({ status: 1, displayOrder: 1, createdAt: -1 });
employeeSchema.index({ isActive: 1 });

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
export { STATUS_VALUES };
