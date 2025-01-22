
const reset = (req, res) => {
    const token = req.query.resetToken;
    if (!token) {
        return res.status(400).send('Token is required');
    }

    try {
        // jwt.verify(token, jwtSecret);
        res.render('reset-password', { token });
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}

module.exports = reset;