const User = require("../models/User");
const bcrypt = require("bcrypt");

// Controller to create a new user
const createUser = async (req, res) => {
  try {
    const { FullName, UserName, Email, Password, Address } = req.body;
    // hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = await User.create({
      FullName,
      UserName,
      Email,
      Password: hashedPassword,
      Address,
    });
    // destructure the new user object to omit the __v and _id fields
    const { __v, _id, ...user } = newUser.toObject();
    // remove the password field from the user object
    delete user.Password;

    res.status(201).json({ Id: _id, ...user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    // destructure the new user object to omit the __v and _id fields and include the Id field with the _id value
    const usersFormatted = users.map((user) => {
      const { __v, _id, ...userFormatted } = user.toObject();
      // remove the password field from the user object
      delete userFormatted.Password;
      return { Id: _id, ...userFormatted };
    });
    res.status(200).json(usersFormatted);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller to get a specific user by Id
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // destructure the new user object to omit the __v and _id fields and include the Id field with the _id value
    const { __v, _id, ...userFormatted } = user.toObject();
    delete userFormatted.Password;
    res.status(200).json({ Id: _id, ...userFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller to update a user
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { FullName, UserName, Email, Password, Address } = req.body;
    const userToUpdate = { FullName, UserName, Email, Password, Address };
    if (Password === undefined || Password === null || Password === "") {
      delete userToUpdate.Password;
    } else {
      // hash the password
      const hashedPassword = await bcrypt.hash(Password, 10);
      userToUpdate.Password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(userId, userToUpdate, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    const { __v, _id, ...userFormatted } = updatedUser.toObject();
    delete userFormatted.Password;
    res.status(200).json({ Id: _id, ...userFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller to delete a user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error });
  }
};

// controller to login and return the user data in the response
const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email: Email });
    // get password from the user object
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    // compare the password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(Password, user.Password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    // destructure the new user object to omit the __v and _id fields and include the Id field with the _id value
    const { __v, _id, ...userFormatted } = user.toObject();
    delete userFormatted.Password;
    res.status(200).json({ Id: _id, ...userFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for checking if an email is already in use
const checkEmail = async (req, res) => {
  try {
    const { Email } = req.body;
    const user = await User.findOne({ Email: Email });
    if (user) {
      return res.status(409).json({ message: "Email already in use." });
    }
    res.status(200).json({ message: "Email is available." });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  checkEmail,
};
