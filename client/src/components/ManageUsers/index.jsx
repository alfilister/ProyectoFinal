import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { getAllUsers, updateUser } from "../../redux/actions";

function ManageUsers() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const [viewModalRol, setViewModalRol] = useState(false);
  const [viewModalAccess, setViewModalAccess] = useState(false);
  const [statusModalRol, setStatusModalRol] = useState(false);
  const [statusModalAccess, setStatusModalAccess] = useState(false);
  const [userSelectRol, setUserSelectedRol] = useState({}); // estadp que se llena cuando el admin selecciona un usuario para cambiarle el rol 
  const [accessChange, setAccessChange] = useState({}); // estado que se llena cuando el admin selecciona un usuario para cambiarle el access

  const changeRol = (user) => {
    setUserSelectedRol(user);
    console.log("SOY EL USUARIO click ROL", user);
    dispatch(getAllUsers());
    if (!statusModalRol) {
      setViewModalRol(false);
      setStatusModalRol(true);
    }
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
      access: userSelectRol.access
    });
    console.log(newRol)
  }
  function handleSubmitRol(e) {
    e.preventDefault();
    dispatch(updateUser(newRol));

    if (!statusModalRol) {
      setViewModalRol(false);
      setStatusModalRol(true);
    }
  }
  const changeAcess = (user) => {
    setAccessChange(user);
    console.log("SOY EL USUARIO click ACESS", user);
    dispatch(getAllUsers());
   /*  if (!statusModalAccess) {
      setViewModalAccess(true);
      setStatusModalAccess(false);
    } */
    setViewModalAccess(true);
    setViewModalRol(false)
  };
  const [newAcess, setNewAcess] = useState({
    fullName: setAccessChange.fullName,
    email: "",
    id_document: "",
    password: "",
    image: "",
    role: "",
    access: "",
  });
  function handleChangeSelectAcces(e) {
    setNewAcess({
      ...newAcess,
      fullName: accessChange.fullName,
      email: accessChange.email,
      id_document: accessChange.id_document,
      password: accessChange.password,
      image: accessChange.image,
      role: accessChange.role,
      access: e.target.value
    });
    console.log(newAcess)
  }
  function handleSubmitAccess(e) {
    e.preventDefault();
    dispatch(updateUser(newAcess));

   /*  if (statusModalAccess) {
      setViewModalAccess(false);
      setStatusModalAccess(true);
    } */
  }
  return (
    <div>
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
      <Modal isOpen={statusModalRol}>
        <ModalHeader>Cambiar el ROL De {userSelectRol.fullName}</ModalHeader>
        <ModalBody>
          <h1>estado actual : {userSelectRol.role}</h1>
          <select onClick={(e) => handleChangeSelectROL(e)}>
            <option value="Admin">Administrator</option>
          </select>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={(e) => {
              handleSubmitRol(e);
              setStatusModalRol(false);
            }}
          >
            Editar
          </button>
          <button
            onClick={() => {
              setStatusModalRol(false);
            }}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={viewModalAccess}>
        <ModalHeader>Cambiar el Acceso De {accessChange.fullName} </ModalHeader>
        <ModalBody>
          <h1>estado actual {accessChange.role} </h1>
          <select onClick={(e) => handleChangeSelectAcces(e)}>
          <option disabled>currentAccess</option>
            <option value="Locked">Bloqueado</option>
          </select>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={(e) => {
              handleSubmitAccess(e);
              setViewModalAccess(false);
            }}
          >
            Editar
          </button>
          <button
            onClick={() => {
              setViewModalAccess(false);
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
