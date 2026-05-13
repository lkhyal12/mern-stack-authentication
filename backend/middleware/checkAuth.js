import jwt from "jsonwebtoken";
export const checkAuth = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders)
    return res.status(401).json({ message: "Missing accessToken" });
  const accessToken = authHeaders.split(" ")[1];
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log("error occured in the checkauth middleware ", err);
    return res
      .status(401)
      .json({ message: "Invalid accessToken", success: false });
  }
};
