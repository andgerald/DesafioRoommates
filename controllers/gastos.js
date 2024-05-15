import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
const findAll = async (req, res) => {
  try {
    const { gastos } = JSON.parse(
      fs.readFileSync("./data/gastos_data.json", "utf8")
    );
    res.status(200).send({ message: "Listado de gastos", gastos });
  } catch (error) {
    console.log(error);
  }
};

const create = async (req, res) => {
  const { roommate, descripcion, monto } = req.body;
  const { gastos } = JSON.parse(
    fs.readFileSync("./data/gastos_data.json", "utf8")
  );
  const id = uuidv4().slice(0, 6);
  const fecha = moment().format("DD/MM/YYYY");
  const newGasto = {
    roommate,
    descripcion,
    monto,
    id,
    fecha,
  };

  gastos.push(newGasto);
  fs.writeFileSync("./data/gastos_data.json", JSON.stringify({ gastos }));
  res.status(201).send({
    message: "Gasto creado con exito",
    newGasto,
  });
};

export const gastosController = {
  findAll,
  create,
};
