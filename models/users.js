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
  },

  DateDeNaissance: {
    type: Date,
    required: true,
  },
  Numero: {
    type: String,
    required: true,
    unique: true, // Si vous voulez que chaque numéro soit unique
    minlength: 10, // Exemple de validation de longueur
    maxlength: 15, // Exemple de validation de longueur
  },
});

export default model("User", userSchema);
