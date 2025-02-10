const hostelWardenSchema = require('../../models/static/hostelWarden/hostelWarden');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        // console.log(email, password);
        const user = await hostelWardenSchema.findOne({ email });

        console.log(user);
        if (!user) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        const token = jwt.sign({ mobile : user.mobile ,uuid : user.uuid}," mysecretabcd", { expiresIn: '7d' });

        res.status(200).send({ token,user });

    } catch (error) {
        console.log("This is an error from ./controllers/hostelWarden/login.js")
        console.log(error);
        res.status(500).send({ error: error.message });
    }
}

module.exports = login;