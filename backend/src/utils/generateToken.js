import jwt from "jsonwebtoken";

export default function generateToken(res, userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
}
