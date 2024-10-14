import { verifyToken } from "../utils/token.js";
import User from "../models/users.js";

export const midllewearDecript = async (req, res, next) => {
  try {
    const tokenNavigateur = req.headers["authorization"];
    const tokenDecripte = await verifyToken(tokenNavigateur);
    const users = await User.findOne({
          email: tokenDecripte.email,
        });
        if(users){
            res.locals.userId = users._id,
            next()
        }
  } catch (error) {
    res.status(401).json({ error });
  }
};