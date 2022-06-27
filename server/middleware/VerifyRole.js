const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        const rolesArrayList = [...allowedRoles];
        const myRoles = [req.roles];
        console.log(rolesArrayList)
        console.log(myRoles)
        const result = myRoles.map(role => rolesArrayList.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRole
