import { verifyToken } from "../utils/token.js";
import User from "../models/users.js";

export const midllewearDecript = async (req, res, next) => {
  try {
    const tokenNavigateur = req.headers["authorization"];
    const tokenDecripte = await verifyToken(tokenNavigateur);
    const user = await User.findOne({
      email: tokenDecripte.email,
    });
    if (user) {
      (res.locals.userId = user._id), next();
    }else{
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
