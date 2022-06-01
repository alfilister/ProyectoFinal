import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { getAllUsers, updateUser } from "../../redux/actions";
import Swal from "sweetalert2";

function ManageUsers() {
	const dispatch = useDispatch();
	const allUsers = useSelector((state) => state.allUsers);
	const [viewModalRol, setViewModalRol] = useState(false);
	const [viewModalAccess, setViewModalAccess] = useState(false);
	const [statusModalRol, setStatusModalRol] = useState(false);
	const [userSelectRol, setUserSelectedRol] = useState({}); // estadp que se llena cuando el admin selecciona un usuario para cambiarle el rol
	const [accessChange, setAccessChange] = useState({}); // estado que se llena cuando el admin selecciona un usuario para cambiarle el access

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	const changeRol = (user) => {
		setUserSelectedRol(user);
		console.log("SOY EL USUARIO click ROL", user);
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
			access: userSelectRol.access,
		});
		console.log(newRol);
	}

	function handleSubmitRol(e) {
		e.preventDefault();
		dispatch(updateUser(newRol));
		dispatch(getAllUsers());

		if (!statusModalRol) {
			setViewModalRol(false);
			setStatusModalRol(true);
		}
		Swal.fire({
			icon: "success",
			title: "Complete!",
			text: "change ROL successfully!",
			confirmButtonText: "Accept",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(getAllUsers());
			}
		});
	}
	const changeAcess = (user) => {
		setAccessChange(user);
		console.log("SOY EL USUARIO click ACESS", user);
		dispatch(getAllUsers());
		setViewModalAccess(true);
		setViewModalRol(false);
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
	}
	function handleSubmitAccess(e) {
		e.preventDefault();
		dispatch(updateUser(newAcess));
		dispatch(getAllUsers());
		Swal.fire({
			icon: "success",
			title: "Complete!",
			text: "change ACCESS successfully!",
			confirmButtonText: "Accept",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(getAllUsers());
			}
		});
	}
	return (
		<div className="manageUsersContainer">
			<br />
			<table class="table table-striped">
				<thead>
					<tr>
						<th className="center" scope="col">
							ID
						</th>
						<th className="center" scope="col">
							User
						</th>
						<th className="center" scope="col">
							identification doc
						</th>
						<th className="center" scope="col">
							email
						</th>
						<th className="center" scope="col">
							Rol
						</th>
						<th className="center" scope="col">
							Change Rol
						</th>
						<th className="center" scope="col">
							Change Access
						</th>
						<th className="center" scope="col">
							Access
						</th>
					</tr>
				</thead>
				<tbody>
					{allUsers?.map((user) => {
						return (
							<tr key={user?.id}>
								<th className="center" scope="col">
									{user?.id}
								</th>
								<td className="center">{user?.fullName}</td>
								<td className="center">
									{user?.id_document ? user.id_document : "Sin Documento,Aun"}
								</td>
								<td className="center">{user?.email}</td>
								<td className="center">{user?.role}</td>
								<td className="center">
									<button
										className="btn"
										onClick={() => {
											changeRol(user);
										}}
									>
										Cambiar ROL
									</button>
								</td>
								<td className="center">
									<button
										className="btn"
										onClick={() => {
											changeAcess(user);
										}}
									>
										Cambiar Access
									</button>
								</td>
								<td className="center">{user?.access}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<Modal isOpen={statusModalRol}>
				<ModalHeader>Cambiar el ROL De {userSelectRol.fullName}</ModalHeader>
				<ModalBody>
					<h1>
						El estado actual de {userSelectRol.fullName} es {userSelectRol.role}
					</h1>
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
					<h1>
						el access actual de {accessChange.fullName} es {accessChange.role}{" "}
					</h1>
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
