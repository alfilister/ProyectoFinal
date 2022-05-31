const axios = require("axios");
const { User } = require("../db");
const db_mock_data = require("../../db_mock_data.json"); //DATA MOCK

const getUser = async () => {
  try {
    //GET DATA MOCK
    db_mock_data.users.forEach(async (user) => {
      await User.findOrCreate({
        where: {
          fullName: user.fullName,
          password: user.password,
          email: user.email,
          role: user.role,
          id_document: user.id_document,
        },
      });
    });
    return await User.findAll();
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (idUser) => {
  try {
    const userRef = await User.findByPk(idUser);
    return userRef.toJSON();
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (body) => {
  const { fullName, email, id_document, password, image, role , access} = body;

  console.log('soy el body' ,body)

  const selectedUser = await User.findAll({
    where: { email: email },
  });
  console.log("soy ", selectedUser);
  selectedUser[0].set({
    fullName,
    email,
    id_document,
    password,
    image,
    role,
    access


  });

  await selectedUser[0].save();

  return selectedUser;
};

const deleteUser = async (idUser) => {
  try {
    const userDeleted = await User.destroy({ where: { id: idUser } });
    return userDeleted;
  } catch (error) {
    console.log(error);
  }
};

const postUser = async (body) => {
  try {
    const { fullName, email, password, image } = body;

    let userCreated = await User.findOrCreate({
      where: {
        fullName: fullName,
        password: password,
        email: email,
        image: image,
      },
    });

    return userCreated;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser, postUser, getUserById, updateUser, deleteUser };
