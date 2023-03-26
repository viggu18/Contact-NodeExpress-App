const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const crypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(401);
    throw new Error("User already exists");
  }

  //Hash password
  const hashedPassword = await crypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      data: { _id: user.id, email: user.email },
      message: "User registered successfully",
    });
  } else {
    res.status(400);
    throw new Error("Error creating the user");
  }
});

//@desc User Login
//@route POST /api/users/login
//@access public
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });

  if (user && (await crypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10m",
      }
    );
    res.status(200).json({ accessToken, message: "Login successful" });
  } else {
    res.status(401);
    throw new Error("Email or password not valid");
  }

  res.status(200).json({ message: "Login succesful" });
});

//@desc Get user data
//@route GET /api/users/current-user
//@access private
const getUserData = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ data: req.user, message: "Fetched current user data" });
});

module.exports = { registerUser, userLogin, getUserData };
