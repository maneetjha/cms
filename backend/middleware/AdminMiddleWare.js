const jwt=require('jsonwebtoken')
require('dotenv').config();

function adminMiddleWare(req,res,next){
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const token = authHeader;
    const creatorID = jwt.verify(token, process.env.JWT_ADMIN);
    req.creatorID=creatorID.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}


module.exports = adminMiddleWare