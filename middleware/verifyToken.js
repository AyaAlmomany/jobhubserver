const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            req.user = user; // Attach user to request
            next(); // Proceed to next middleware
        });
    } else {
        return res.status(401).json({ message: "Authorization token must be Bearer [token]" });
    }
};///////
const verifyAndAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && (req.user.uid || req.user.isAdmin)) {
            next(); // User is authorized
        } else {
            return res.status(403).json({ message: "You are not authorized to access this resource" });
        }
    });
};
const verifyAgent =(req,res,next)=>{
    verifyToken(req,ers,()=>{
        if(req.user.isAgentreq.user.isAdmin){
            next();
        }
        else{
            return res.status(403).json({message:"you are not authorized to access"})
        }
    })
}

module.exports= {verifyToken,verifyAgent,verifyAndAuth}