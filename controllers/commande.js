import Command from "../models/commande.js";

class CommandeControllers {
  ////////deposer dans la BD , decryptage token lors du depot de commande dans la bd
  static async createCommande(req, res) {
    try {
      //R requette
      const data = req.body;
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

  ///recuperer dans la BD
  static async getCommandes(req, res) {
    try {
      //R requette
      const userId = res.locals.userId;
      if (!userId) {
        res.status(404).json({ statut: false, message: "userId manquant" });
      }
      //method de recuperation dans ma Bd
      const commandes = await Command.find({ userId: userId });
      res.status(200).json({ statut: true, commandes: commandes });
    } catch (e) {
      console.log("error", e);
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  ///modifier un element dans ma base de donnees
  static async updateCommande(req, res) {
    try {
      //R requette
      const commandeId = req.params.id;
      console.log(commandeId);

      if (!commandeId) {
        res
          .status(404)
          .json({ statut: false, message: "id commande manquant" });
      }

      const data = req.body;

      ///metod de modifications dans ma BD
      const updateCommande = await Command.findByIdAndUpdate(
        commandeId,
        { ...data, annuler: true },
        { new: true }
      );
      if (!updateCommande) {
        res
          .status(404)
          .json({ statut: false, message: "commande non trouvée" });
      }
      return res.status(201).json({ statut: true, message: updateCommande });
    } catch (e) {
      return res.status(500).json({ statut: false, message: e.message });
    }
  }
}

export default CommandeControllers;
