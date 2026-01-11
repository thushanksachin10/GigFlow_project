import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User exists" });

  const user = await User.create({ name, email, password });
  generateToken(res, user._id);

  res.json({ message: "Registered", user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(400).json({ message: "Invalid credentials" });

  generateToken(res, user._id);
  res.json({ message: "Logged in", user });
};
