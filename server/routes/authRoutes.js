import express from "express";
import authController from "../controllers/authController.js";
import passport from "passport";
import "../config/googleStrategy.js";
import jwtUtil from "../config/generatetoken.js";

const router = express.Router();

// Normal login/signup
router.post("/login", authController.login);
router.post("/signup", authController.signup);

// Google login route
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login", session: false }),
    (req, res) => {
        // User mil gaya (googleStrategy.js me serialize kiya hai)


        const token = jwtUtil.generateToken({
            id: req.user._id,
            email: req.user.email,
            userName: req.user.userName,
        });

        // Cookie set karna
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,       // local testing ke liye false rakho
            sameSite: "None",   // agar frontend alag port pe hai
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        // Redirect to frontend after login
        res.redirect("http://localhost:3000");
    }
);

export default router;
