const jwt = require('jsonwebtoken');

const authMiddleware = ( req, res, next)=>{

    let token = req.header("Authorization")
console.log(process.env.JWT_SECRET);

    if (!token) return res.status(401).json({ message: "Access denied. No token provided" });

    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
}

module.exports = authMiddleware