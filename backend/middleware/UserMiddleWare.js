const jwt=require('jsonwebtoken')
require('dotenv').config();

function userMiddleWare(req,res,next){
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const token = authHeader;
    const userid = jwt.verify(token, process.env.JWT_USER);
    req.userid=userid.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}


module.exports = userMiddleWare