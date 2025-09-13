// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config()

// const generateToken = (id)=>{
//    const privatekey = process.env.JWT_SECRET;
//    const token = jwt.sign(id, privatekey);
//    return token
// }


// const verifyToken = (token)=>{
// if(!token) return null;
// try{
//     return jwt.verify(token,process.env.JWT_SECRET);
// }catch(error){
//     return null
// }
// }


// export default {generateToken,verifyToken};


import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (payload) => {
  const privatekey = process.env.JWT_SECRET;

  // payload should always be an object
  return jwt.sign(payload, privatekey, { expiresIn: "7d" });
};

const verifyToken = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export default { generateToken, verifyToken };
