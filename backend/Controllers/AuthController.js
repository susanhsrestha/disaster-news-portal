const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, username, createdAt } = req.body;

        // Check if any required fields are missing
        if (!email || !password || !username) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(409)
                .json({ success: false, message: "User already exists" });
        }

        const user = await User.create({ email, password, username, createdAt });
        const token = createSecretToken(user._id);
        // console.log(token)
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
            sameSite: "None",
            secure: true,
        });
        res
            .status(201)
            .json({ success: true, message: "User signed up successfully", user, token });
        next();
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ success: false, message: "An error occurred. Please try again later" });
    }
};


module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Check if the password is correct
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Incorrect email or password' });
        }

        const token = createSecretToken(user._id);
        // console.log(token)
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true, // Set httpOnly to true for better security
            sameSite: "None", // Allow the cookie in third-party contexts
            secure: true, // Only transmit the cookie over secure HTTPS connections
        });

        res.status(200).json({ success: true, message: 'User logged in successfully', token });
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred. Please try again' });
    }
}

module.exports.Logout = async (req, res, next) => {
    try {
        // Clear the token cookie by setting it to an empty value and expiring it
        res.cookie("token", "", {
            expires: new Date(0),
            withCredentials: true,
            httpOnly: false,
        });

        res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
module.exports.Home = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        const token = createSecretToken(user._id);
        // console.log(token)
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true, // Set httpOnly to true for better security
            sameSite: "None", // Allow the cookie in third-party contexts
            secure: true, // Only transmit the cookie over secure HTTPS connections
        });
        res.status(200).json({ success: true, user: user.username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
