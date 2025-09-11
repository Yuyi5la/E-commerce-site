import bcrypt from "bcrypt"; 
import prisma from "../prismaClient.js"; 

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "user", 
      },
    });

    res.status(201).json(user);

  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  try {
    if (!id) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // rehashed passwords
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Prevent normal users from updating role
    if (updates.role && req.user.role !== "admin") {
      return res.status(403).json({ message: "You are not allowed to change roles" });
    }

    const updatedUser = await prisma.users.update({
      where: { id: Number(id) },
      data: updates,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};