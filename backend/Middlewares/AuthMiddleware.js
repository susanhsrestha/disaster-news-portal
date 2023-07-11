const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../Models/UserModel');

module.exports.authMiddleware = async (req, res, next) => {
    // verify user is authenticated
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};
