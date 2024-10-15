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
app.use(express.static('public'));
app.use(morgan("dev"));


app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});
app.use("/api/users",UserRouter);
app.use("/api/commande",midllewearDecript,commandeRouter);

connecterDb()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log("function");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
