const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");

const connectDB = require("./config/db");
require("./config/passport"); // ✅ Google OAuth Passport config

const campaignRoutes = require("./routes/campaignRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes"); // ✅ AI route added

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middlewares
app.use(cors());
app.use(bodyParser.json());

// ✅ Session middleware (needed for Google OAuth via Passport)
app.use(
  session({
    secret: "mini_crm_secret", // better to use a secure secret in production
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Auth routes
app.use("/auth", authRoutes);

// ✅ Middleware to protect private API routes
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
}

// ✅ Protected API routes
app.use("/api/customers", isLoggedIn, customerRoutes);
app.use("/api/orders", isLoggedIn, orderRoutes);
app.use("/api/campaigns", isLoggedIn, campaignRoutes);
app.use("/api/ai", aiRoutes); // ✅ AI route added

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Mini CRM API is running!");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
