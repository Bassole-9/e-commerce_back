import express from "express";
import path from "path";
import cors from "cors";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import morgan from "morgan";
import UserRouter from "./routes/user.js";
import commandeRouter from "./routes/commande.js";
import { connecterDb } from "./config/db.js";
import { midllewearDecript } from "./middlewears/midelUser.js";

config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//lecture du dossier Dist
app.use(express.static(path.join(__dirname, "dist")));

app.use(morgan("dev"));
app.use("/api/users", UserRouter);
app.use("/api/commande", midllewearDecript, commandeRouter);
// SPA (React)
app.use(express.static(path.join(__dirname, "dist")));



//supprime tous tes console Log et remplace la base url par l'url de render et tu fait mise en production avec le dist du front
// SPA (React)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
////

connecterDb()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log("🚀 serveur en march sur le port 3000");
    });
  })
  .catch((error) => {
    console.log(error.message)
  });
