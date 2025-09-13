// const express = require("express");
// const cors = require("cors");
import express from "express";
import cors from "cors";
// const chatRoutes = require("./routes/chatRoutes");
import chatRoutes from "./routes/chatRoutes.js"
import authRoutes from './routes/authRoutes.js'
import auth from "./middlewares/auth.js"




const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json({
  strict: true 
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api",auth, chatRoutes);
app.use("/user",authRoutes)
app.get("/", (req, res) => res.send("Server running ✅"));

// module.exports = app;
export default app;
