// Import the User model and the bcrypt library
const User = require("../models/Users");
const bcrypt = require("bcrypt");

// Export the Signup function as a middleware
module.exports.Signup = async (req, res, next) => {
  try {
    // Destructure email, password, and createdAt from the request body
    const { email, password, createdAt } = req.body;

    // Check if a user with the provided email already exists in the database
    const existingUser = await User.findOne({ email });

    // If a user with the email already exists, return a response indicating so
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    // If the user does not exist, hash the password using bcrypt and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, createdAt });

    // Send a successful response with status code 201, a success message, and the user data
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });

    // Call the next middleware in the stack
    next();
  } catch (error) {
    // If an error occurs during the process, log the error to the console
    console.error(error);
  }
};
