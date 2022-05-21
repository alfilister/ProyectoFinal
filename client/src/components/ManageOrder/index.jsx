import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { updateOrder } from "../../redux/actions";

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
		payment_id: "",
		updatedAt: "",
		createdAt: "",
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

	const searchBar = (event) => {}; //temrinar

	return (
		<div>
			<select
				onClick={(event) => {
					searchBar(event);
				}}
				name="newStatus"
			>
				<option value="">Buscar Status...</option>
				<option value="attempted">Attempted</option>
				<option value="active">Active</option>
				<option value="dispatched">Dispatched</option>
				<option value="complete">Complete</option>
			</select>
			<table>
				<thead>
					<tr>
						<td>ID</td>
						<td>Payment ID</td>
						<td>createdAt</td>
						<td>updatedAt</td>
						<td>status</td>
						<td>Ver</td>
						<td>Opciones</td>
					</tr>
				</thead>
				<tbody>
					{ordersShow?.map((order) => {
						return (
							<tr key={order?.id}>
								<td>{order?.id}</td>
								<td>{order?.payment_id ? order.payment_id : "No hay"}</td>
								<td>{order?.createdAt}</td>
								<td>{order?.updatedAt}</td>
								<td>{order?.status}</td>
								<td>
									<button
										onClick={() => {
											viewOrder(order);
										}}
									>
										➡
									</button>
								</td>
								<td>
									<button
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
					<span>{orderSelected?.id}</span>
				</ModalHeader>
				<ModalBody>
					<span>City: {orderSelected?.city}</span>
					<br />
					<span>Payment ID: {orderSelected?.payment_id}</span>
					<br />
					<span>Shipping address: {orderSelected?.shipping_address}</span>
					<br />
					<span>State: {orderSelected?.state}</span>
					<br />
					<span>Status: {orderSelected?.status}</span>
					<br />
					<span>Zip code: {orderSelected?.zip_code}</span>
					<br />
					<span>Created at: {orderSelected?.createdAt}</span>
					<br />
					<span>Updated at: {orderSelected?.updatedAt}</span>
					<br />
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
				<ModalHeader>Cambiar el estado de {orderSelected.id}</ModalHeader>
				<ModalBody>
					<label>Estado actual {orderSelected.status}</label>
					<select
						onClick={(event) => {
							handleStatus(event);
						}}
						name="newStatus"
					>
						<option value="none">Status...</option>
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
