const jwt = require("jsonwebtoken");
require("dotenv").config();

const { asyncWrapper }= require('../middleware');
const { User } = require('../models');

// endpoint: /login
const loginController = asyncWrapper(async (req, res) => {
    const { email, password } = req.body; // password is encrypted

    let user = await User.findOne({ email: email, password: password }).exec();

    // user with these details DNE
    if(!user)
        return res.status(400).json({ message: 'Invalid credintials' });

    const name = user.name;

    // Generate an access token using the user's name and email, the access token secret, and an expiration time of 30 minutes
    const accessToken = jwt.sign(
        {
            userInfo: {
                name, // The user's name
                email // The user's email
            }
        },
        process.env.ACCESS_TOKEN_SECRET, // The secret used to sign the access token
        { expiresIn: "1800s" } // The expiration time of the access token (1800 seconds = 30 minutes)
    );

    // Generate a refresh token using the user's name, the refresh token secret, and an expiration time of 1 day
    const refreshToken = jwt.sign(
        { name }, // The payload of the refresh token (the user's name)
        process.env.REFRESH_TOKEN_SECRET, // The secret used to sign the refresh token
        { expiresIn: "1d" } // The expiration time of the refresh token (1 day)
    );

    // Update the user's document in the database to store the refresh token
    await User.updateOne({ email: email }, { refreshToken: refreshToken });

    // Set a cookie named "jwt" with the refresh token, which is HTTP-only and expires after 24 hours
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true, 
        maxAge: 1000 * 60 * 60 * 24 // 24 hours in milliseconds
    });

    // Set a cookie named "accessToken" with the access token, which is HTTP-Only and expires after 1 hour
    res.cookie("accessToken", accessToken, { 
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 30 // 30 mins in milliseconds
    });

    // Send a 200 OK response
    res.status(200).json({ message: "logged in successfully" });
});

module.exports = loginController;