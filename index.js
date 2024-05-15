import express from "express";
import "dotenv/config";
import path from "path";

const { PORT } = process.env;
const __dirname = path.resolve();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
