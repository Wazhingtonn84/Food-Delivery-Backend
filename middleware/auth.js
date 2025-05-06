
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
// import jwt from "jsonwebtoken";

// const authMiddleware = async (req, res, next) => {
//     const token = req.headers.token || req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ success: false, message: "Not authorized. Login again." });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = { userId: decoded.id }; // Safe and clean way to attach user info

//         next();
//     } catch (error) {
//         console.error("Auth error:", error);
//         res.status(403).json({ success: false, message: "Invalid or expired token." });
//     }
// };

// export default authMiddleware;
