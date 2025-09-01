// const express = require("express");
import express from "express";
// const chatController = require("../controllers/chatController");
import chatController from "../controllers/chatController.js";
const router = express.Router(); 

router.post("/chat", chatController);

export default router;
