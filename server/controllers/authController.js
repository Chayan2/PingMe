// import UserModel from "../models/user.js";
// import jwt from "../config/generatetoken.js"


// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // 1. Find user by email
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(401).json({
//         message: "User not found",
//       });
//     }

//     // 2. Validate password
//     const validate = await user.matchPassword(password);
//     if (!validate) {
//       return res.status(401).json({
//         message: "Invalid password",
//       });
//     }

//     const token = jwt.generateToken({ email: email,   userName: password })
//     res.cookie("token", token, {
//     httpOnly: true,
//     secure: false, // local dev ke liye false (prod me true with HTTPS)
//     sameSite: "lax",
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//   });
//     // 3. Success
//     return res.status(200).json({
//       message: "Authentication successful",
//       user: {
//         id: user._id,
//         email: user.email,
//         userName: user.userName,
//       }
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Server error",
//     });
//   }
// };


// // SIGNUP controller
// const signup = async (req, res) => {
//   try {
//     //   console.log("body signup "+JSON.stringify(req))
//     if(!req.body) return res.status(400).json({"message":"Bad Request"});
//     const { username, email, password } = req.body;

//     // Basic validation
//     if (!username || !email || !password) {
//       return res.status(400).json({
//         message: "Username, email and password are required"
//       });
//     }

//     // Check if user already exists
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({
//         message: "User already exists with this email"
//       });
//     }

//     // Create new user (pre-save hook will hash password)
//     const createUser = await UserModel.create({
//       userName: username,
//       email,
//       password
//     });
//     const token = jwt.generateToken({ id: createUser._id,  email: createUser.email,   userName: createUser.userName })
//     res.cookie("token", token, {
//     httpOnly: true,
//     secure: false, // local dev ke liye false (prod me true with HTTPS)
//     sameSite: "lax",
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//   });
//     return res.status(201).json({
//       message: "User has been created successfully",
//       user: {
//         id: createUser._id,
//         username: createUser.userName,
//         email: createUser.email
//       },
//     });

//   } catch (error) {
//     console.error("Signup error:", error);
//     return res.status(500).json({
//       message: "Server Error"
//     });
//   }
// };


// export default { login, signup };

import UserModel from "../models/user.js";
import jwtUtil from "../config/generatetoken.js"; // generateToken & verifyToken

// LOGIN controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 2. Check password
    const validate = await user.matchPassword(password);
    if (!validate) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3. Token generate
    const token = jwtUtil.generateToken({
      id: user._id,
      email: user.email,
      userName: user.userName,
    });

    // 4. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // prod me true
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Authentication successful",
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// SIGNUP controller
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email and password are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    const createUser = await UserModel.create({
      userName: username,
      email,
      password,
    });

    const token = jwtUtil.generateToken({
      id: createUser._id,
      email: createUser.email,
      userName: createUser.userName,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // prod me true
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User has been created successfully",
      user: {
        id: createUser._id,
        username: createUser.userName,
        email: createUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// PROFILE (protected)
const getProfile = async (req, res) => {
  try {
    // req.user auth middleware se aayega
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default { login, signup, getProfile };
