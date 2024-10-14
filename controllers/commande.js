import Command from "../models/commande.js";

class CommandeControllers {
  ////////deposer dans la BD , decryptage token lors du depot de commande dans la bd
  static async createCommande(req, res) {
    try {
      //R requette
      const data = req.body;
      console.log(data);

      if (!data.total) {
        throw new Error("total manquant");
      }
      //method d'enregistrement dans ma Bd
      const newCommande = await Command.create({
        total: data.total,
        objet: data.objet,
        userId: res.locals.userId,
        annuler: false,
      });
      res.status(201).json({ statut: true, message: newCommande });
    } catch (e) {
      console.log("error", e);
      res.status(500).json({ statut: false, message: e.message });
    }
  }
}

export default CommandeControllers;
