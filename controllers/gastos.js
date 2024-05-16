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
  try {
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
  } catch (error) {
    res.status(500).send({ message: "Error al procesar la solicitud" });
  }
};

const remove = async (req, res) => {
  const { id } = req.query;
  try {
    const { gastos } = JSON.parse(
      fs.readFileSync("./data/gastos_data.json", "utf8")
    );
    const eliminado = gastos.findIndex((gasto) => gasto.id === id);
    if (eliminado !== -1) {
      gastos.splice(eliminado, 1);
      fs.writeFileSync("./data/gastos_data.json", JSON.stringify({ gastos }));
      res.status(200).send({ message: "El gasto ha sido eliminado con exito" });
    } else {
      res.status(400).send({ message: "Gasto no encontrado" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error al procesar la solicitud" });
  }
};

const update = async (req, res) => {
  const { roommate, descripcion, monto } = req.body;
  const { id } = req.query;
  try {
    const { gastos } = JSON.parse(
      fs.readFileSync("./data/gastos_data.json", "utf8")
    );
    const actulizado = gastos.findIndex((g) => g.id === id);
    if (actulizado !== -1) {
      gastos[actulizado] = {
        id,
        roommate,
        descripcion,
        monto,
      };
      console.log(descripcion);
      fs.writeFileSync("./data/gastos_data.json", JSON.stringify({ gastos }));
      res.status(200).send({
        message: "Gasto actulizado con exito",
        gastos,
      });
    } else {
      res.status(404).send({ message: "Gasto no encontrado" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error al procesar la solicitud" });
  }
};

export const gastosController = {
  findAll,
  create,
  remove,
  update,
};
