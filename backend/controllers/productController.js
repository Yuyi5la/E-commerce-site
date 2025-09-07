import prisma from "../prismaClient.js";
import cloudinary from "../config/cloudinary.js";

export const createProduct = async (req, res) => {
  const { name, price, stock, description } = req.body;
  const files = req.files; // multiple uploaded files

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }
  if (!files || files.length === 0) {
    return res.status(400).json({ error: "At least one image file is required" });
  }

  try {
    // Upload all images to Cloudinary
    const uploadResults = await Promise.all(
      files.map((file) => cloudinary.uploader.upload(file.path))
    );

    // Just take the first image as the main image
    const mainImageUrl = uploadResults[0].secure_url;

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        description,
        image_url: mainImageUrl,
      },
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
