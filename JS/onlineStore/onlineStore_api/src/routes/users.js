const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { hashPassword, comparePasswords } = require("../utils/hash");
const prisma = new PrismaClient();
const passwordValidator = require("password-validator"); 
const router = express.Router();

const passwordSchema = new passwordValidator();
passwordSchema
  .is().min(8) 
  .has().uppercase() 
  .has().lowercase() 
  .has().digits(1) 
  .has().not().spaces();                        

router.post("/login", async (req, res) => {
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

    // Store user data in the session
    req.session.user = {
      customer_id: user.customer_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };
    const sessionId = req.session.id;

    // Return session ID and user data
    res.status(200).json({
      message: "Login successful",
      sessionId: req.sessionID, // Return session ID
      user: req.session.user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Check for missing fields
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Validate password
  const passwordValidationResult = passwordSchema.validate(password, { list: true });
  if (passwordValidationResult.length > 0) {
    return res.status(400).json({
      error: "Password does not meet the security policy.",
      issues: passwordValidationResult, // Optional: Return specific validation issues
    });
  }

  try {
    // Check if the email is already registered
    const existingUser = await prisma.customer.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists." });
    }

    // Hash the password and create the user
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.customer.create({
      data: {
        email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
      },
    });

    // Respond with success message
    res.status(201).json({
      message: "User created successfully",
      userId: newUser.customer_id,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


router.post("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ error: "Could not log out." });
      }
      res.status(200).json({ message: "Logout successful" });
    });
  } else {
    res.status(400).json({ error: "No user logged in." });
  }
});

router.get("/getSession", (req, res) => {
  if (req.session.user) {
    res.status(200).json({
      message: "Session active",
      sessionId: req.sessionID, // Include session ID
      session: req.session.user,
    });
  } else {
    res.status(401).json({ error: "Session not found or expired." });
  }
});

module.exports = router;