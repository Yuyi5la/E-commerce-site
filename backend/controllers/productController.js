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

    const product = await prisma.products.create({
      data: {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        description,
        image_urls: uploadResults.map((result) => result.secure_url),
      },
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
 
// update products
export const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const updatedProduct = await prisma.products.update({
      where: { id: Number(id) },
      data: updates,
    });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Error updating product", error });
  }
};

// get products 
export const getProducts = async (req, res) => {
  try {
    const allProducts = await prisma.products.findMany(); 

    return res.status(200).json({
      success: true,
      data: allProducts,
    });
  } catch (error) {
    console.error("Cannot get products:", error.message);

    return res.status(500).json({
      success: false,
      message: "Error getting products",
    });
  }
};