import * as fs from "fs";
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

export const gastosController = {
  findAll,
};
