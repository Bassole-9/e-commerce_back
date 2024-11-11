import { Router } from "express";
import CommandeControllers from "../controllers/commande.js";

const commandeRouter = Router();

commandeRouter.get("/", CommandeControllers.getCommandes);
commandeRouter.post("/", CommandeControllers.createCommande);
commandeRouter.put("/updateCommande/:id", CommandeControllers.updateCommande);

export default commandeRouter;