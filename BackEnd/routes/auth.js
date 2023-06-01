const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_TOKEN = "HariIsAGoodBoy$#";

//ROUTE 1 : Create a user using Post endpoint: "/api/user/createUser". Doesn't require authentication

router.post(
  "/createUser",
  [
    body("name", "Name should be more that 3 charachters")
      .notEmpty()
      .isLength({ min: 3 }),
    body("email", "Invalid email Address").isEmail(),
    body("password", "Password length should be min 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //Check if user is validated with the above requirements
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    //Find a user by email exists or not and will return true if no user with the same email exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Some one with this email already exists" });
      }

      //Using Hashing teching to protect password:
      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      const secPass = await bcrypt.hash(req.body.password, salt);
      console.log(secPass);

      // Create a user:
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      //Creating a sample data and creating a new token for securing authentication:
      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, JWT_TOKEN);
      res.json(authToken);

      //Catching the error if any occured in the server:
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .send({ error: "We have detected some error in the server" });
    }
  }
);

//ROUTE 2 : Create a user using Post endpoint: "/api/user/login". Doesn't require authentication

router.post(
  "/login",
  [
    body("email", "Invalid email Address").isEmail(),
    body("password", "Enter a valid password").exists(),
  ],
  async (req, res) => {
    //Check if user is validated with the above requirements
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Email and password mismatch" });
      }
      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, JWT_TOKEN);
      res.json({ authToken: authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: "Internal server Error" });
    }
  }
);

//ROUTE 3 : Retrieving the details of loggedIn user endpoint: "/api/user/getUser". Login required:

router.post("/getUser", fetchuser, async (req, res) => {
  try {
    userId = req.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server Error in retrieving user data" });
  }
});
module.exports = router;
