import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// ===============================
// REGISTER USER
// ===============================
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role
    });

    generateToken(res, user._id);

    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};


// ===============================
// LOGIN USER
// ===============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);

    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    generateToken(res, user._id);

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};


// ===============================
// GET LOGGED-IN USER (AUTH CHECK)
// ===============================
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User no longer exists" });
    }

    res.json({ user });

  } catch (err) {
    console.error("GetMe Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};


// ===============================
// LOGOUT USER
// ===============================
export const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({ message: "Logged out successfully" });
};
