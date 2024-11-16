const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../utils/hash');
const { comparePasswords } = require('../utils/hash');
const prisma = new PrismaClient();

const router = express.Router();

const sessions = new Map();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await prisma.customer.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    const sessionId = `${user.customer_id}-${Date.now()}`;
    sessions.set(sessionId, { userId: user.customer_id, email: user.email });

    res.status(200).json({ message: "Login successful", sessionId });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post('/signup', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const existingUser = await prisma.customer.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists." });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.customer.create({
      data: {
        email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
      },
    });

    res.status(201).json({ message: "User created successfully", userId: newUser.customer_id });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post('/logout', (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(400).json({ error: "Invalid session ID." });
  }

  sessions.delete(sessionId);
  res.status(200).json({ message: "Logout successful" });
});

router.get('/getSession', (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(401).json({ error: "Session not found or expired." });
  }

  const sessionData = sessions.get(sessionId);
  res.status(200).json({ message: "Session active", session: sessionData });
});

module.exports = router;