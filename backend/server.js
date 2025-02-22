require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key";

const users = [];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ email, password });
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    })
    .status(201)
    .json({ message: "User registered and authenticated" });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "User verified successfully" });
});

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

app.get("/profile", authenticate, (req, res) => {
  res.json({ email: req.user.email, message: "Profile data retrieved" });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
