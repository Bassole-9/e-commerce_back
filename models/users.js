import { Schema, model } from "mongoose";

const userSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  motDePasse: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (v) {
    //     // Exemple de validation : au moins 8 caractères, incluant des chiffres et des lettres
    //     return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v);
    //   },
    //   message:
    //     "au moins 8 caractères incluant des lettres majuscule et miniscules et des chiffres.",
    // },
  },
  DateDeNaissance: {
    type: Date,
    required: true,
  },
  //   Numero: {
  //     type: String,
  //     required: true,
  //     validate: {
  //       validator: function (v) {
  //         return /^\d{10}$/.test(v); // Par exemple, pour un numéro de téléphone à 10 chiffres
  //       },
  //       message: "veuillez entree un numeros 10 chiffres",
  //     },
  //   },
});
export default model("User", userSchema);
