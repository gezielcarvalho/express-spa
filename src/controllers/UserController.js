const User = require("../models/User");

// Controller to create a new user
const createUser = async (req, res) => {
  try {
    const { FullName, UserName, Email, Password, Address } = req.body;
    const newUser = await User.create({
      FullName,
      UserName,
      Email,
      Password,
      Address,
    });
    // destructure the new user object to omit the __v and _id fields
    const { __v, _id, ...user } = newUser.toObject();

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
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { FullName, UserName, Email, Password, Address },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    const { __v, _id, ...userFormatted } = updatedUser.toObject();
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

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
