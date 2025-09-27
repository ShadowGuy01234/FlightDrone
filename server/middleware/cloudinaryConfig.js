import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const requiredEnv = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing Cloudinary environment variable: ${key}`);
  }
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const allowedFormats = ["jpg", "jpeg", "png", "webp"];

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "flightdrone/employees",
    allowed_formats: allowedFormats,
    transformation: [{ quality: "auto", fetch_format: "auto" }],
    resource_type: "image",
  }),
});

const uploadEmployeeImage = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },
  fileFilter: (req, file, cb) => {
    if (!file || !file.mimetype) {
      cb(new Error("Invalid file"));
      return;
    }

    const isAllowed = allowedFormats.some((format) =>
      file.mimetype.toLowerCase().includes(format)
    );

    if (!isAllowed) {
      cb(new Error("Only jpg, jpeg, png and webp images are allowed"));
      return;
    }

    cb(null, true);
  },
}).single("photo");

const deleteCloudinaryAsset = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Failed to delete Cloudinary asset", error);
  }
};

export { cloudinary, uploadEmployeeImage, deleteCloudinaryAsset };
