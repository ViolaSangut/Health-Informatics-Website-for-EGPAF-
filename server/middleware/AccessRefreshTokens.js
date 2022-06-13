const { sign } = require("jsonwebtoken");

//Creating accessToken
const createAccessToken = (user) =>{
  
    const accessToken = sign(
        {id: user.id, firstName: user.firstName, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { 
          
          expiresIn: "50m",
        }
      );
     return accessToken;


};

//Creating refreshToken
const createRefreshToken = (user) =>{
  
    const refreshToken = sign(
        {id: user.id, firstName: user.firstName, email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        {
          
          expiresIn: "1h",
        }
      );
     return refreshToken;


};

module.exports = { createAccessToken, createRefreshToken }
