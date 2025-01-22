const dataAuth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send({ error: "Access Denied" });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        console.log("This is error from ./middleware/dataAuth.js");
        console.log(error);
        res.status(400).send({ error: "Invalid Token" });
    }
}                                                                       

module.exports = dataAuth;