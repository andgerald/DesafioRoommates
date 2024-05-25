import axios from "axios";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

const create = async (req, res) => {
  try {
    const result = await axios.get("https://randomuser.me/api");
    const { data } = result;
    const newUser = data.results[0];
    const id = uuidv4().slice(0, 6);

    const roommate = {
      id,
      nombre: newUser.name.first,
      email: newUser.email,
      debe: 0,
      recibe: 0,
      total: 0,
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
    res.status(200).send({ message: "Listado de usuarios", roommates });
  } catch (error) {
    console.log(error);
  }
};

export const roommatesController = {
  create,
  findAll,
};
