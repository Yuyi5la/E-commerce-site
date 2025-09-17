import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
   
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: { name, email, password: hashedPassword },
    });

    // generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // find user
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Cannot login user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.json({ message: "Logout successful. Please remove token on client side." });
};
