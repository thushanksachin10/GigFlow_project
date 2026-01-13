import jwt from "jsonwebtoken";

export default function generateToken(res, userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
}
