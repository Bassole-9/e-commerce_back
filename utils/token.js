import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const secret = process.env.tokenSecret;
  if (!secret) throw new Error("env var : jwt secret manquant");

  const token = jwt.sign(
    { userId: payload._id, nom: payload.nom, email: payload.email },
    secret,
    {
      expiresIn: "12h",
    }
  );
  return token;
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token,process.env.tokenSecret);
  } catch (e) {
    return false;
  }
};
