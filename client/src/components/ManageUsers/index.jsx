import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { authenticatedReact, getAllUsers, updateUser } from "../../redux/actions";

function ManageUsers() {

    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.allUsers)
    //console.log(allUsers)
    const orders = useSelector((state) => state.ordersDb);
	orders.sort((a, b) => {
		return a.id - b.id;
	});
    const [viewModal, setViewModal] = useState(false);
    const [statusModal, setStatusModal] = useState(false);
    const [userSelect, setUserSelected] = useState({});


// estado donde se va a guardar el rol que elija el ADMIN 

const changeRol = (user) => {
    setUserSelected(user)
    dispatch(getAllUsers())
    if (!statusModal) {
        setViewModal(false);
        setStatusModal(true);
    }
}

const changeAcess = (user) => {
    setUserSelected(user)
    dispatch(getAllUsers())
    if (statusModal) {
        setViewModal(true);
        setStatusModal(false);
    }
}
//console.log(userSelect)
const [newRol, setNewRol] = useState({
    fullName: "",
    email: "",
    id_document: "",
    password: "",
    image: "",
    role: "",

  });
//aca voy a obtener el id del usuario que seleccione el admin 
//    console.log(userSelect.id)

  function handleChangeSelect(e) {

    setNewRol({
      ...newRol,
      email : userSelect.email,
      role : e.target.value,
      fullName: userSelect.fullName,
      id_document: userSelect.id_document,
      password: userSelect.password,
      image: userSelect.image,
      access : e.target.value

     
    });
    console.log(newRol)
  }
    
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getAllUsers())
    dispatch(updateUser(newRol))
    
    if (!statusModal) {
        setViewModal(false);
        setStatusModal(true)
        dispatch(getAllUsers())
        dispatch(authenticatedReact(false))
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
                        <td>Documento de identidad</td>
                        <td>User</td>
                        <td>email</td>
                        <td>Rol</td>
                        <td>Opciones</td>
                        <td>Access</td>
                    </tr>
                </thead>
                <tbody>
                    {allUsers?.map((user) => {
                        return (
                            <tr key={user?.id}>
                                <td>{user?.id}</td>
                                <td>{user?.id_document ? user.id_document : "usuario sin documento por el momento.."}</td>
                                <td>{user?.fullName}</td>
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
                                <td>{user?.access}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
            <Modal isOpen={statusModal}>
				<ModalHeader>
					Cambiar el ROL Del usuario 
				</ModalHeader>
				<ModalBody>
					<h1>estado actual : User</h1>
					<select
                        onClick={e => handleChangeSelect(e)}
						
					
					>   
                    <option></option>
						<option value="Admin">Admin</option>
					</select>
				</ModalBody>
				<ModalFooter>
					<button
						onClick={(e) => {
							handleSubmit(e);
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

            <Modal isOpen={statusModal}>
				<ModalHeader>
					Cambiar el Acceso Del usuario 
				</ModalHeader>
				<ModalBody>
					<h1>estado actual : Authorized </h1>
					<select
                        onClick={e => handleChangeSelect(e)}
						
					
					>   
                    <option></option>
						<option value="LOCKED">LOCKED</option>
					</select>
				</ModalBody>
				<ModalFooter>
					<button
						onClick={(e) => {
							handleSubmit(e);
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
