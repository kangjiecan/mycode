import express from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/hash.js";
import { comparePassword } from "../utils/hash.js";

const router = express.Router();

const prisma = new PrismaClient();

function isAuthenticated(req, res, next) {
  if (req.session && req.session.isAuthenticated) {
      return next();
  }
  res.status(401).json({ error: 'Unauthorized: No active session' });
}

router.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    req.session.userId = user.id; 
    req.session.isAuthenticated = true;
    res
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", (req, res) => {
  res.send("Logout route");
});

router.get("/session", isAuthenticated, (req, res) => {
  res.send("Session route: You are authenticated!");
});

export default router;
