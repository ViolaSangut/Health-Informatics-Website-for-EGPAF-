const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sign } = require("jsonwebtoken");

//login
const login = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });
  
    if (!user) {
      res.json({ error: "wrong username or password!" });
    } else {
      const userPassword = user.password;
      bcrypt.compare(password, userPassword).then((match) => {
        if (!match) {
          res.json({ error: "wrong username or password!" });
        } else {
          
          const id = user.id;
          const email = user.email;
          const firstName = user.firstName;
          const lastName = user.lastName;
          const roles = [user.RoleId];
  
           //Creating accessToken
           const createAccessToken = (user) =>{
                  
            const accessToken = sign(
                {id: user.id, firstName: user.firstName, email: user.email, roles: roles },
                process.env.ACCESS_TOKEN_SECRET,
                { 
                
                expiresIn: "5s",
                }
            );
            return accessToken;
  
  
           };
  
          const accessToken = createAccessToken(user);
  
        //Creating refreshToken
          const createRefreshToken = (user) =>{
      
            const refreshToken = sign(
                {
                    id: user.id, email: user.email, roles: roles
                },
                process.env.REFRESH_TOKEN_SECRET,
                {
                  
                  expiresIn: "15s",
                }
              );
            return refreshToken;
  
  
          };
          const refreshToken = createRefreshToken(user);
  
          // Saving refreshToken with current user
          Users.update(
            { refresh_token: refreshToken },
            {
              where: {
                id: user.id,
              },
            }
          );
          // Creating a secure Cookie with refresh token
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 	24 * 60 * 60 * 1000,
          });
          res.json({ accessToken, id, email, firstName, lastName, roles });
        }
      });
    }
  };

//Logout
const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    //Removing refreshToken
    await Users.update(
      { refresh_token: null },
      {
        where: {
          id: userId,
        },
      }
    );
    //Deleting cookie
    res.clearCookie("refreshToken", {httpOnly: true, sameSite: "None", secure: true,});
    return res.sendStatus(200);
  };


  module.exports = {
    login,
    logout,
  };
  