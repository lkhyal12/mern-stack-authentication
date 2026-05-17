import jwt from "jsonwebtoken";
export const generateAccessToken = (user) => {
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
};

export const generateRefreshToken = (user) => {
  const userObj = {
    verified: user.verified,
    userId: user._id,
    email: user.email,
    name: user.name,
  };
  const refreshToken = jwt.sign(
    { user: userObj },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );
  return refreshToken;
};
export function setCookies(res, user) {
  const refreshToken = generateRefreshToken(user);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
}
