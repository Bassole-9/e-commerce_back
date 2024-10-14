import userControllers from "../controllers/user.js";
import { Router } from "express";

//permet de definir des routes pour differentes method HTTP
const router = Router();
router.post("/", userControllers.createUser);
router.get("/", userControllers.getAllUser);
router.get("/:id", userControllers.getUser);
router.delete("/:id", userControllers.deleteUser);
router.put("/:id", userControllers.updateUser);
router.post("/login", userControllers.login);
export default router;