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


  static async getCommandes(req, res) {
    try {
      //R requette
      const userId = res.locals.userId
      
      if (!userId) {
        res.status(404).json({statut:false, message:"userId manquant"})
      }
      //method d'enregistrement dans ma Bd
      const commandes = await Command.find({userId : userId})
      // if(commandes.length===0){
      //   res.status(404).json({statut:false,message:"aucune commande trouvée"})
      // }
      res.status(200).json({ statut: true, commandes:commandes });
    } catch (e) {
      console.log("error", e);
      res.status(500).json({ statut: false, message: e.message });
    }
  }



  static async updateCommande(req, res) {
    try {
      //R requette
      const commandeId = req.params.id;
      if (!commandeId) {
        res.status(404).json({statut:false, message:"id commande manquant"})
      }

      const data = req.body;
      if (!data) {
        res.status(404).json({statut:false, message:"aucune donneé a mettre a jour"})
      }
      //method d'enregistrement dans ma Bd
      const updateCommande = await Command.findByIdAndUpdate({
        _id: commandeId,
        userId: res.locals.userId,
      });
      res.status(201).json({ statut: true, message: newCommande });
    } catch (e) {
      console.log("error", e);
      res.status(500).json({ statut: false, message: e.message });
    }
  }
}

export default CommandeControllers;
