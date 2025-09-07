import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

const prisma = new PrismaClient();

//create products 
export const createProduct = async (res,req) =>{
    const { name, price, stock, description, imageUrl } = req.body;

}