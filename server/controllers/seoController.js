import Product from "../models/Product.js";
import Category from "../models/Category.js";

// Generate dynamic sitemap XML
export const generateSitemap = async (req, res) => {
  try {
    const baseURL = "https://www.flytiumdrones.com";
    const currentDate = new Date().toISOString().split("T")[0];

    // Fetch all active products
    const products = await Product.find({ isAvailable: true })
      .select("_id slug updatedAt")
      .lean();

    // Fetch all categories
    const categories = await Category.find({})
      .select("_id slug updatedAt")
      .lean();

    // Build XML sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Static Pages -->
  <url>
    <loc>${baseURL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>${baseURL}/store</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${baseURL}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${baseURL}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Dynamic Product Pages -->
`;

    // Add product URLs
    products.forEach((product) => {
      const lastmod = product.updatedAt
        ? product.updatedAt.toISOString().split("T")[0]
        : currentDate;
      sitemap += `  <url>
    <loc>${baseURL}/product/${product.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    });

    // Add category URLs
    categories.forEach((category) => {
      const lastmod = category.updatedAt
        ? category.updatedAt.toISOString().split("T")[0]
        : currentDate;
      sitemap += `  <url>
    <loc>${baseURL}/category/${category.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    });

    sitemap += `</urlset>`;

    // Set headers for XML response
    res.header("Content-Type", "application/xml");
    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send({
      success: false,
      message: "Error generating sitemap",
      error: error.message,
    });
  }
};

// Get page-specific metadata
export const getPageMetadata = async (req, res) => {
  try {
    const { page } = req.params;

    const metadata = {
      home: {
        title:
          "Flytium Drones | Drone Training, Workshops, Repair & E-Commerce in India",
        description:
          "Flytium Drones offers professional drone training, DGCA drone pilot workshops, drone repair services, and e-commerce for drone & IoT components in Gorakhpur, Uttar Pradesh, India.",
        keywords:
          "drone training, DGCA certified, drone workshop, drone repair, buy drones India",
        ogImage:
          "https://res.cloudinary.com/dhkpwi9ga/image/upload/v1735826340/gs8gxkiomuxgn6ndjjys.png",
      },
      store: {
        title:
          "Drone Store | Buy Drones, Parts & Accessories Online | Flytium Drones",
        description:
          "Shop premium drones, drone parts, IoT sensors, and accessories at Flytium Drones. Quality products with fast shipping across India.",
        keywords:
          "buy drones online, drone parts, drone accessories, IoT sensors, drone motors",
        ogImage:
          "https://res.cloudinary.com/dhkpwi9ga/image/upload/v1735826340/gs8gxkiomuxgn6ndjjys.png",
      },
      about: {
        title:
          "About Flytium Drones | Leading Drone Training Institute in India",
        description:
          "Learn about Flytium Drones, India's premier drone training institute in Gorakhpur, UP. DGCA certified training, expert instructors, and state-of-the-art facilities.",
        keywords:
          "drone training institute, DGCA certified, Gorakhpur drone training, about Flytium Drones",
        ogImage:
          "https://res.cloudinary.com/dhkpwi9ga/image/upload/v1735826340/gs8gxkiomuxgn6ndjjys.png",
      },
      contact: {
        title:
          "Contact Flytium Drones | Get in Touch for Drone Training & Services",
        description:
          "Contact Flytium Drones in Gorakhpur, UP for drone training inquiries, workshop registrations, repair services, or product purchases.",
        keywords:
          "contact Flytium Drones, drone training contact, Gorakhpur drone institute",
        ogImage:
          "https://res.cloudinary.com/dhkpwi9ga/image/upload/v1735826340/gs8gxkiomuxgn6ndjjys.png",
      },
    };

    const pageMetadata = metadata[page.toLowerCase()] || metadata.home;

    res.status(200).send({
      success: true,
      metadata: pageMetadata,
    });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching metadata",
      error: error.message,
    });
  }
};

// Update metadata (admin only)
export const updateMetadata = async (req, res) => {
  try {
    const { page, title, description, keywords, ogImage } = req.body;

    // In a production environment, you would store this in a database
    // For now, this is a placeholder for the functionality

    res.status(200).send({
      success: true,
      message: "Metadata updated successfully",
      data: { page, title, description, keywords, ogImage },
    });
  } catch (error) {
    console.error("Error updating metadata:", error);
    res.status(500).send({
      success: false,
      message: "Error updating metadata",
      error: error.message,
    });
  }
};
