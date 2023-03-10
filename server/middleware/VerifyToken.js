const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
 
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if(!authHeader?.startsWith('Bearer')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1]; //splitting the value by space and separating the token.

  if (token == null)  
    return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.email = decoded.email;
      req.firstName = decoded.firstName;
      req.lastName = decoded.lastName;
      req.roles = decoded.roles;
      req.id = decoded.id;
      
      next();
    }
    );
  
  
}

module.exports = { verifyToken }
