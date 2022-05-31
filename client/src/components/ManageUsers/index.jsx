import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {
  authenticatedReact,
  getAllUsers,
  updateUser,
} from "../../redux/actions";

function ManageUsers() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const [viewModal, setViewModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [userSelectRol, setUserSelectedRol] = useState({});
  const [accessChange, setAccessChange] = useState({});

  const changeAcess = (user) => {
    setAccessChange(user);
    dispatch(getAllUsers());
    if (!statusModal) {
      setViewModal(true);
      setStatusModal(false);
    }

    console.log("soy el usuario seleccionado en el change Acess ", accessChange);
  };

  //estado que guarda y setea el access


  const changeRol = (user) => {
    setUserSelectedRol(user);
    console.log("SOY EL USUARIO ", user);
    dispatch(getAllUsers());
    if (!statusModal) {
      setViewModal(false);
      setStatusModal(true);
    }
    console.log("soy el usuario seleccionado en el change ROL ", user);
  };
  //estado que guarda y setea el rol
  const [newRol, setNewRol] = useState({
    fullName: "",
    email: "",
    id_document: "",
    password: "",
    image: "",
    role: "",
    access: "",
  });

  function handleChangeSelectROL(e) {
    setNewRol({
      ...newRol,
      email: userSelectRol.email,
      role: e.target.value,
      fullName: userSelectRol.fullName,
      id_document: userSelectRol.id_document,
      password: userSelectRol.password,
      image: userSelectRol.image,
    });
    console.log("soy el estado ", newRol);
  }

  function handleSubmitRol(e) {
    e.preventDefault();
    dispatch(getAllUsers());
    dispatch(updateUser(newRol));

    if (!statusModal) {
      setViewModal(false);
      setStatusModal(true);
      dispatch(getAllUsers());
      dispatch(authenticatedReact(false));
    }
  }

  function handleChangeSelectAcces(e) {
      console.log('soy El userSelectRol de handlechangeAcess', userSelectRol)
    setAccessChange({
      ...newRol,
      email: userSelectRol.email,
      access: e.target.value,
    });
    console.log("soy el estado del selectAcces ", accessChange);
  }

  function handleSubmitAccess(e) {
    e.preventDefault();
    dispatch(getAllUsers());
    dispatch(updateUser(accessChange));

    if (!statusModal) {
      setViewModal(false);
      setStatusModal(true);
      dispatch(getAllUsers());
      dispatch(authenticatedReact(false));
    }
  }

  return (
    <div>
      {/* <label>Buscar por Nombre</label>
            <select>
                <option value="none"></option>
                <option value="User">User</option>
            </select> */}
      <br />
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td></td>
            <td>User</td>
            <td></td>
            <td>identification doc</td>
            <td></td>
            <td>email</td>
            <td>Rol</td>
            <td>Change Rol</td>
            <td>Change Access</td>
            <td></td>
            <td>Access</td>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user) => {
            return (
              <tr key={user?.id}>
                <td>{user?.id}</td>
                <td></td>
                <td>{user?.fullName}</td>
                <td></td>
                <td>
                  {user?.id_document ? user.id_document : "Sin Documento,Aun"}
                </td>
                <td></td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>
                  <button
                    onClick={() => {
                      changeRol(user);
                    }}
                  >
                    Cambiar ROL
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      changeAcess(user);
                    }}
                  >
                    Cambiar Access
                  </button>
                </td>
                <td></td>
                <td>{user?.access}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal isOpen={statusModal}>
        <ModalHeader>Cambiar el ROL Del usuario</ModalHeader>
        <ModalBody>
          <h1>estado actual : User</h1>
          <select onClick={(e) => handleChangeSelectROL(e)}>
            <option value="Admin">Administrator</option>
          </select>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={(e) => {
              handleSubmitRol(e);
              setStatusModal(false);
            }}
          >
            Editar
          </button>
          <button
            onClick={() => {
              setStatusModal(false);
            }}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={!statusModal}>
        <ModalHeader>Cambiar el Acceso Del usuario</ModalHeader>
        <ModalBody>
          <h1>estado actual : Authorized </h1>
          <select onClick={(e) => handleChangeSelectAcces(e)}>
            <option value="Locked">Bloqueado</option>
          </select>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={(e) => {
              handleSubmitAccess(e);
              setStatusModal(false);
            }}
          >
            Editar
          </button>
          <button
            onClick={() => {
              setStatusModal(false);
            }}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ManageUsers;
