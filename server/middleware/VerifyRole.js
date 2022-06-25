const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        // if (!req?.Roles) return res.sendStatus(401);
        const rolesList = [...allowedRoles];
        console.log(req.Role)
        console.log(rolesList)
        
        // const result = req.role.map(oneRole => rolesList.includes(oneRole)).find(val => val === true);
        // if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRole
