import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { getAllUsers, updateUser } from "../../redux/actions";

function ManageUsers() {
	const dispatch = useDispatch();
	const allUsers = useSelector((state) => state.allUsers);
	const [viewModal, setViewModal] = useState(false);
	const [statusModal, setStatusModal] = useState(false);
	const [userSelectRol, setUserSelectedRol] = useState({}); // estadp que se llena cuando el admin selecciona un usuario para cambiarle el rol
	const [accessChange, setAccessChange] = useState({}); // estado que se llena cuando el admin selecciona un usuario para cambiarle el access

	const changeRol = (user) => {
		setUserSelectedRol(user);
		console.log("SOY EL USUARIO click ROL", user);
		dispatch(getAllUsers());
		if (!statusModal) {
			setViewModal(false);
			setStatusModal(true);
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
			access: userSelectRol.access,
		});
		console.log(newRol);
	}

	function handleSubmitRol(e) {
		e.preventDefault();
		dispatch(updateUser(newRol));

		if (!statusModal) {
			setViewModal(false);
			setStatusModal(true);
		}
	}

	const changeAcess = (user) => {
		setAccessChange(user);
		console.log("SOY EL USUARIO click ACESS", user);
		dispatch(getAllUsers());
		if (!statusModal) {
			setViewModal(true);
			setStatusModal(false);
		}
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
			access: e.target.value,
		});
		console.log(newAcess);
	}

	function handleSubmitAccess(e) {
		e.preventDefault();
		dispatch(updateUser(newAcess));

		if (!statusModal) {
			setViewModal(false);
			setStatusModal(true);
		}
	}

	return (
		<div className="manageUsersContainer">
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
