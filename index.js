import express from "express";
import "dotenv/config";
import path from "path";
import roommate from "./routes/roommate.js";
import gastos from "./routes/gastos.js";
import cors from "cors";

const { PORT } = process.env;
const app = express();
// const cors = cors();

app.use(express.json());
app.use(cors());
app.use(roommate);
app.use(gastos);
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
