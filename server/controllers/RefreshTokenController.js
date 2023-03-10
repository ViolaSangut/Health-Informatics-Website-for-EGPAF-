const { Users } = require("../models");
const jwt = require("jsonwebtoken");

 const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.sendStatus(401);

    const refreshToken = cookies.refreshToken;

    // const presentUser = Users.find(user => user.refresh_token === refreshToken);
    const presentUser = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
 
    if (!presentUser[0]) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || decoded.email !== presentUser[0].email) return res.sendStatus(403);

        const roles = [presentUser[0].RoleId];
        const firstName = presentUser[0].firstName;
        const lastName = presentUser[0].lastName;

        const accessToken = jwt.sign(
          { "id": decoded.id, "firstName": decoded.firstName, "lastName": decoded.lastName, "email": decoded.email, "roles":roles},
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "10m",
          }
        );
        res.json({ accessToken, roles, firstName, lastName });
      }
    );
};

module.exports = { handleRefreshToken }
