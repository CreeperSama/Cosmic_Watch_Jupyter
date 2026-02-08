// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     const authHeader = req.header("Authorization") || req.header("authorization");

//     if (!authHeader) {
//       return res.status(401).json({ msg: "No token, auth denied" });
//     }

//     const token = authHeader.startsWith("Bearer ")
//       ? authHeader.slice(7).trim()
//       : authHeader.trim();

//     if (!token) {
//       return res.status(401).json({ msg: "No token, auth denied" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };



const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 1. Get header (handle case-insensitivity)
    const authHeader = req.header("Authorization") || req.header("authorization");

    // 2. Check if header exists
    if (!authHeader) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // 3. Extract Token (Support "Bearer <token>" and just "<token>")
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7, authHeader.length).trimLeft()
      : authHeader;

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // 4. Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded; // Attach user payload to request
    next();
    
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};