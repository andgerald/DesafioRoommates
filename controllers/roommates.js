import axios from "axios";
import * as fs from "fs";
const create = async (req, res) => {
  try {
    const result = await axios.get("https://randomuser.me/api");
    const { data } = result;
    const newUser = data.results[0];

    const roommate = {
      nombre: newUser.name.first,
      email: newUser.email,
    };

    const { roommates } = JSON.parse(
      fs.readFileSync("./data/roommates_data.json", "utf8")
    );

    roommates.push(roommate);
    fs.writeFileSync(
      "./data/roommates_data.json",
      JSON.stringify({ roommates })
    );
    res.status(201).send({
      message: "Usuario creado con exito",
      roommate,
    });
  } catch (error) {
    console.log(error);
  }
};

const findAll = async (req, res) => {
  try {
    const { roommates } = JSON.parse(
      fs.readFileSync("./data/roommates_data.json", "utf8")
    );
    // const roommates = todos.map((r) => r.nombre);
    // console.log(roommates, "quetengo");
    res.status(200).send({ message: "Listado de usuarios", roommates });
  } catch (error) {
    console.log(error);
  }
};

export const roommatesController = {
  create,
  findAll,
};
