import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
    const token = req.headers["authorization"];

    // console.log("TOKEN RECEIVED:", token);

    if (!token) {
        return res.status(401).send("Access Denied");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("JWT ERROR:", err.message);
            return res.status(403).send("Invalid Token");
        }

        // console.log("DECODED:", decoded);

        req.userId = decoded.id;
        next();
    });
}
export default authenticateToken;