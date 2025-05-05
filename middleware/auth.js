
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized. Login again." });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: token_decode.id };

        next();
    } catch (error) {
        console.error("Auth error:", error);
        res.status(403).json({ success: false, message: "Invalid or expired token." });
    }
};

export default authMiddleware;