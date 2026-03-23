import { connect } from "mongoose";

export const connecterDb = async () => {
  try {
    const secret = process.env.MONGO_URI;

    if (!secret) {
      throw new Error(" URL MongoDB inexistante");
    }

    await connect(secret, {
      dbName: "fin",
    });

    console.log(" MongoDB connecté ");
  } catch (error) {
    console.error(" Erreur connexion DB :", error.message);
    process.exit(1);
  }
};