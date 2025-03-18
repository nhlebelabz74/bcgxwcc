const { User } = require('../models');
const { asyncWrapper } = require('../middleware');

// endpoint: /logout
const logoutController = asyncWrapper(async (req, res) => {
    // Get the cookies from the request object
    const cookies = req.cookies;

    // If there are no cookies
    if (!cookies)
        return res.status(204).json({ // Send a 204 No Content response with a message
            message: "Already logged out" 
        }); 
    else
        if (!cookies.jwt) // If there's no JWT cookie
            return res.status(204).json({ // Send a 204 No Content response with a message
                message: "Already logged out" 
            });

    // Get the refresh token from the JWT cookie
    const refreshToken = cookies.jwt;

    // Try to find a user in the database with the provided refresh token
    const user = await User.findOne({ refreshToken: refreshToken }).exec();

    // If the user doesn't have a refresh token
    if (!user.refreshToken) {
        // Clear the refresh and access tokens in the cookie
        res.clearCookie("jwt", { httpOnly: true });
        res.clearCookie("accessToken", { httpOnly: true});

        // Send a 204 No Content response with a message
        return res.status(204).json({ message: "Logged out successfully" });
    }

    // If the user has a refresh token, clear it
    user.refreshToken = "";
    // Save the updated user document to the database
    await user.save();

    // Clear the refresh and access tokens in the cookie
    res.clearCookie("jwt", { httpOnly: true });
    res.clearCookie("accessToken", { httpOnly: true});

    // Send a 200 OK response with a message
    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = logoutController;