const express = require("express");
const router = express.Router();
const passport = require("passport");

// Start Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    res.redirect("http://localhost:5173/campaigns"); // redirect to frontend after login
  }
);

// Success route
router.get("/success", (req, res) => {
  res.send(`Welcome ${req.user.displayName}`);
});

// Failure route
router.get("/failure", (req, res) => {
  res.send("Authentication failed!");
});

// ✅ Check authentication status
router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

// ✅ Optional: Logout route
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
