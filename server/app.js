// const express = require("express");
// const cors = require("cors");
import express from "express";
import cors from "cors";
// const chatRoutes = require("./routes/chatRoutes");
import chatRoutes from "./routes/chatRoutes.js"

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api", chatRoutes);

app.get("/", (req, res) => res.send("Server running ✅"));

// module.exports = app;
export default app;
