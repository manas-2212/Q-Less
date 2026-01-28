const prisma = require("../prisma.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["CUSTOMER", "BUSINESS"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      }
    })
    res.status(201).json({
      message: "User registered successfully",
      userId: user.id
    })
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Email already registered"
      });
    }
  
    res.status(500).json({
      message: "Signup failed"
    });
  }  
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" })
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      message: "Login successful",
      token
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Login failed" })
  }
}

module.exports = { signup, login }


// demo token:- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NTc3ODVhMjMyYWFiNTU1NzIyZDRkNCIsInJvbGUiOiJCVVNJTkVTUyIsImlhdCI6MTc2NzM0MDE1OSwiZXhwIjoxNzY3OTQ0OTU5fQ.oZkgisUw1zeY0itoj862WzNGYqkO1L1qQoeQYX-W9V8