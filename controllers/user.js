import User from "../models/users.js";
import { hash, compare, genSalt } from "bcrypt";
import { generateToken } from "../utils/token.js";

class userControllers {
  static async createUser(req, res) {
    try {
      const { nom, DateDeNaissance, Numero, email, motDePasse } = req.body;

      const BonMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !motDePasse || !nom || !DateDeNaissance || !Numero) {
        return res.status(400).json({
          message: "Veuillez renseigner tous les champs",
          status: false,
        });
      }

      if (!BonMail.test(email)) {
        return res
          .status(400)
          .json({ message: "Veuillez entrer un email valide", status: false });
      }

      if (motDePasse.length < 6) {
        return res.status(400).json({
          message: "Le mot de passe doit contenir au moins 6 caracteres",
          status: false,
        });
      }

      const exist = await User.findOne({ email });

      if (exist) {
        return res
          .status(404)
          .json({ statut: false, message: "Ce utilisateur existe deja" });
      }
      const salt = await genSalt(10);
      const HashMdp = await hash(motDePasse, salt);
      const newUser = await User.create({
        nom,
        DateDeNaissance,
        Numero,
        email,
        motDePasse: HashMdp,
      });
      if (!newUser) {
        return res
          .status(404)
          .json({ statut: false, message: "Erreur lors création" });
      }
      console.log(newUser);
      res.status(200).json({ statut: true, message: newUser });
    } catch (e) {
      console.error(e);
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const { motDePasse, ...body } = req.body;
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user)
        return res
          .status(404)
          .json({ statut: false, message: "utilisateur non trouvé" });
      const salt = await genSalt(10);
      const HashMdp = await hash(motDePasse, salt);

      await User.updateOne({ _id: id }, { HashMdp, ...body });
      res.status(201).json({ statut: true, message: "bien modifié " });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user)
        return res
          .status(404)
          .json({ statut: false, message: "utilisateur non trouvé" });
      await User.deleteOne({ _id: id });
      res.status(200).json({ statut: true, message: "supprimé avec succès" });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  static async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user)
        return res
          .status(404)
          .json({ statut: false, message: "utilisateur non trouvé" });
      res.status(201).json({ statut: true, message: user });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  static async getAllUser(req, res) {
    try {
      const user = await User.find({ email });
      console.log("tech", user);

      if (!user)
        return res
          .status(404)
          .json({ statut: false, message: "Pas d'utilisateur" });
      res.status(201).json({ statut: true, message: user });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, motDePasse } = req.body;
      const BonMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !motDePasse) {
        return res.status(400).json({
          message: "Veuillez renseigner tous les champs",
          status: false,
        });
      }

      if (!BonMail.test(email)) {
        return res
          .status(400)
          .json({ message: "Veuillez entrer un email valide", status: false });
      }

      const user = await User.findOne({ email });
      if (!user) {
        res
          .status(401)
          .json({ statut: false, message: "Cet utilisateur n'existe pas" });
      }

      if (user) {
        const passwordMatch = await compare(motDePasse, user.motDePasse);
        if (!passwordMatch) {
          res
            .status(401)
            .json({ statut: false, message: "mot de passe Invalide" });
        } else {
          if (passwordMatch) {
            const userObject = {
              ...user.toObject(),
              motDePasse: undefined,
              _id: undefined,
            };
            const tokens = generateToken(userObject);
            if (tokens)
              return res.status(200).json({
                statut: true,
                token: tokens,
                message: userObject,
              });
          }
          return res.status(401).json({
            statut: false,
            message: "tech",
          });
        }
      }
    } catch (e) {
      return res.status(500).json({ statut: false, message: e.message });
    }
  }
}
export default userControllers;
