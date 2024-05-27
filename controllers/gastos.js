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
    const { roommates } = JSON.parse(
      fs.readFileSync("./data/roommates_data.json", "utf8")
    );
    const result = monto / roommates.length;
    roommates.forEach((rm) => {
      if (rm.nombre === roommate) {
        if (!rm.recibe) {
          rm.recibe = 0;
        }
        rm.recibe += result;
        rm.total += monto;
      } else {
        if (!rm.debe) {
          rm.debe = 0;
        }
        rm.debe += result;
      }
    });
    fs.writeFileSync(
      "./data/roommates_data.json",
      JSON.stringify({ roommates })
    );

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
    // Leer datos de los archivos
    const gastosData = JSON.parse(
      fs.readFileSync("./data/gastos_data.json", "utf8")
    );
    const roommatesData = JSON.parse(
      fs.readFileSync("./data/roommates_data.json", "utf8")
    );

    const { gastos } = gastosData;
    const { roommates } = roommatesData;

    // Encontrar el gasto existente
    const index = gastos.findIndex((g) => g.id === id);
    if (index === -1) {
      return res.status(404).send({ message: "Gasto no encontrado" });
    }

    // Obtener el monto original para ajustar los valores de 'recibe' y 'debe'
    const originalMonto = gastos[index].monto;
    const nuevoMonto = (monto - originalMonto) / roommates.length;

    // Actualizar los valores de 'recibe' y 'debe'
    roommates.forEach((rm) => {
      if (rm.nombre === roommate) {
        rm.recibe = (rm.recibe || 0) + nuevoMonto;
        rm.total = (rm.total || 0) + (monto - originalMonto);
      } else {
        rm.debe = (rm.debe || 0) + nuevoMonto;
      }
    });

    // Guardar los cambios en roommates
    fs.writeFileSync(
      "./data/roommates_data.json",
      JSON.stringify({ roommates }, null, 2)
    );

    // Actualizar el gasto
    gastos[index] = {
      id,
      roommate,
      descripcion,
      monto,
    };

    // Guardar los cambios en gastos
    fs.writeFileSync(
      "./data/gastos_data.json",
      JSON.stringify({ gastos }, null, 2)
    );

    // Enviar respuesta de éxito
    res.status(200).send({
      message: "Gasto actualizado con éxito",
      gastos,
    });
  } catch (error) {
    // Enviar respuesta de error
    res.status(500).send({ message: "Error al procesar la solicitud" });
  }
};

export const gastosController = {
  findAll,
  create,
  remove,
  update,
};
