import jwt from "jsonwebtoken";


import util from "util";



const auth = (req, res, next) => {
  try {
    // console.log("req.cookies "+req)
    console.log(util.inspect(req, { showHidden: false, depth: null, colors: true }));
    const token = req.cookie; // httpOnly cookie
    console.log("token "+token)

    if (!token) {
      return res.status(401).json({ message: JSON.stringify(req) });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach user info
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token"});
  }
};

export default auth;
