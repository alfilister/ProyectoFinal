import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {
	updateOrder,
	statusFilter,
	getOrdersFromDb,
} from "../../redux/actions";

function ManageOrder() {
	const dispatch = useDispatch();

	const orders = useSelector((state) => state.ordersDb);
	orders.sort((a, b) => {
		return a.id - b.id;
	});

	const [ordersShow, setOrdersShow] = useState(orders);
	const [copyOrdersShow, setCopyOrdersShow] = useState(orders);
	const [viewModal, setViewModal] = useState(false);
	const [statusModal, setStatusModal] = useState(false);
	const [orderSelected, setOrderSelected] = useState({
		id: "",
		cart_list: [],
		products_id: [],
		total_purchase: 0,
		receiver_phone: 0,
		createdAt: "",
		updatedAt: "",
		user: {
			id: "",
			fullName: "",
			password: "",
			email: "",
			id_document: "",
			role: "",
			image: "",
		},
		payment_id: "",
		status: "",
		user_id: "",
		state: "",
		city: "",
		shipping_address: "",
		zip_code: "",
	});

	const viewOrder = (order) => {
		setOrderSelected(order);
		setViewModal(true);
		setStatusModal(false);
	};

	const changeStatus = (order) => {
		if (!statusModal) {
			setOrderSelected(order);
			setViewModal(false);
			setStatusModal(true);
		} else {
			if (!(orderSelected.status === "none")) {
				var newData = ordersShow;
				newData.map((o) => {
					if (o.id === orderSelected.id) {
						o.status = orderSelected.status;
					}
				});
				setOrdersShow(newData);
				dispatch(updateOrder(orderSelected));
			}
			setStatusModal(false);
		}
	};

	const handleStatus = (event) => {
		setOrderSelected({
			...orderSelected,
			status: event.target.value,
		});
	};

	const searchBar = (event) => {
		const { value } = event.target;
		if (value === "none") {
			setOrdersShow(copyOrdersShow);
		} else {
			setOrdersShow(copyOrdersShow.filter((or) => or.status === value));
		}
	};

	return (
		<div className="manageOrdersContainer">
			<div class="mb-3">
				<label class="form-label buscar">Buscar por estado</label>
				<select
					class="form-select"
					onChange={(event) => {
						searchBar(event);
					}}
					name="newStatus"
				>
					<option value="none">Todos los estados</option>
					<option value="attempted">Attempted</option>
					<option value="active">Active</option>
					<option value="dispatched">Dispatched</option>
					<option value="complete">Complete</option>
				</select>
			</div>
			<table class="table table-striped">
				<thead>
					<tr>
						<th className="center" scope="col">
							ID
						</th>
						<th className="center" scope="col">
							Payment ID
						</th>
						<th className="center" scope="col">
							Creado
						</th>
						<th className="center" scope="col">
							Actualizado
						</th>
						<th className="center" scope="col">
							Estado
						</th>
						<th className="center" scope="col">
							Ver
						</th>
						<th className="center" scope="col">
							Opciones
						</th>
					</tr>
				</thead>
				<tbody>
					{ordersShow?.map((order) => {
						return (
							<tr key={order?.id}>
								<th className="center" scope="col">
									{order?.id}
								</th>
								<td className="center">
									{order?.payment_id ? order.payment_id : "No hay"}
								</td>
								<td className="center">{order?.createdAt}</td>
								<td className="center">{order?.updatedAt}</td>
								<td className="center">{order?.status}</td>
								<td className="center">
									<button
										className="btn"
										onClick={() => {
											viewOrder(order);
										}}
									>
										➡
									</button>
								</td>
								<td>
									<button
										className="btn"
										onClick={() => {
											changeStatus(order);
										}}
									>
										Cambiar estado
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<Modal isOpen={viewModal}>
				<ModalHeader>
					<span>Orden #{orderSelected?.id}</span>
				</ModalHeader>
				<ModalBody>
					<h3>Datos del cliente:</h3>
					<span>Nombre del cliente: {orderSelected?.user.fullName}</span>
					<br />
					<span>Documento del cliente: {orderSelected?.user.id_document}</span>
					<br />
					<span>Correo del cliente: {orderSelected?.user.email}</span>
					<br />
					<h3>Datos del envio:</h3>
					<span>City: {orderSelected?.city}</span>
					<br />
					<span>State: {orderSelected?.state}</span>
					<br />
					<span>Shipping address: {orderSelected?.shipping_address}</span>
					<br />
					<span>Zip code: {orderSelected?.zip_code}</span>
					<br />
					<span>Telefono del cliente: {orderSelected?.receiver_phone}</span>
					<br />
					<h3>Datos de la compra:</h3>
					<span>Fecha de compra: {orderSelected?.createdAt}</span>
					<br />
					<span>Valor de la compra: {orderSelected?.total_purchase}</span>
					<br />
					<h3>Productos:</h3>
					<table>
						<thead>
							<tr>
								<td>Id del producto</td>
								<td>Nombre del producto</td>
								<td>Cantidad</td>
								<td>Valor del producto</td>
							</tr>
						</thead>
						<tbody>
							{orderSelected?.cart_list.map((item) => {
								return (
									<tr>
										<td>{item[0]}</td>
										<td>{item[1]}</td>
										<td>{item[3]}</td>
										<td>{item[2]}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</ModalBody>
				<ModalFooter>
					<button
						onClick={() => {
							setViewModal(false);
						}}
					>
						Ok
					</button>
					<button
						onClick={() => {
							setViewModal(false);
						}}
					>
						Cancelar
					</button>
				</ModalFooter>
			</Modal>

			<Modal isOpen={statusModal}>
				<ModalHeader>
					Cambiar el estado de la orden #{orderSelected.id}
				</ModalHeader>
				<ModalBody>
					{ordersShow?.map((order) => {
						if (order.id === orderSelected.id) {
							return <span key={order.id}>Estado actual {order.status}</span>;
						}
					})}
					<select
						onClick={(event) => {
							handleStatus(event);
						}}
						name="newStatus"
					>
						<option>Status...</option>
						<option value="attempted">Attempted</option>
						<option value="active">Active</option>
						<option value="dispatched">Dispatched</option>
						<option value="complete">Complete</option>
					</select>
				</ModalBody>
				<ModalFooter>
					<button
						onClick={() => {
							changeStatus();
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

export default ManageOrder;
