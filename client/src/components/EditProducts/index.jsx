import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { updateProduct, deleteProduct } from "../../redux/actions";

function EditProduct() {
	const dispatch = useDispatch();

	const allProducts = useSelector((state) => state.products);
	const allCategories = useSelector((state) => state.categories);
	allProducts.sort((a, b) => {
		return a.id - b.id;
	});

	const [productsShow, setProductsShow] = useState(allProducts);
	const [searching, setSearching] = useState(allProducts);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [productSelected, setProductSelected] = useState({
		id: "",
		name: "",
		image: "",
		aux_images: [],
		description: "",
		discount: 0,
		stock: 0,
		price: 0,
		featured: "",
		categories: [],
	});
	const [search, setSearch] = useState("");

	const productToEdit = (p, acction) => {
		setProductSelected(p);
		if (acction === "edit") {
			setEditModal(true);
			setDeleteModal(false);
		} else {
			setEditModal(false);
			setDeleteModal(true);
		}
	};

	const handleInput = (event) => {
		const { value, name } = event.target;
		setProductSelected((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	function handleSelect(e) {
		if (e.target.checked) {
			setProductSelected({
				...productSelected,
				categories: [...productSelected.categories, { name: e.target.value }],
			});
		} else {
			e.target.checked = false;
			setProductSelected({
				...productSelected,
				categories: productSelected.categories.filter(
					(el) => el.name !== e.target.value
				),
			});
		}
	}

	const postData = () => {
		dispatch(updateProduct(productSelected));
		//local
		var newData = productsShow;
		newData.map((pro) => {
			if (pro.id === productSelected.id) {
				pro.name = productSelected.name;
				pro.image = productSelected.image;
				pro.aux_images = productSelected.aux_images;
				pro.description = productSelected.description;
				pro.discount = productSelected.discount;
				pro.stock = productSelected.stock;
				pro.price = productSelected.price;
				pro.featured = productSelected.featured;
				pro.categories = productSelected.categories;
			}
			return newData
		});
		setProductsShow(newData);
		setSearching(newData);
		setEditModal(false);
	};

	const deleteData = () => {
		dispatch(deleteProduct(productSelected.id));
		setProductsShow(
			productsShow.filter((pro) => pro.id !== productSelected.id)
		);
		setSearching(productsShow.filter((pro) => pro.id !== productSelected.id));
		setDeleteModal(false);
	};

	const searchProduct = (event) => {
		const { value } = event.target;
		setSearch(value);
		setProductsShow(() => searching.filter((p) => p.name.includes(value)));
	};

	return (
		<div>
			<div>
				<label>Buscar</label>
				<input
					type="text"
					value={search}
					onChange={(event) => {
						searchProduct(event);
					}}
				></input>
			</div>
			<table>
				<thead>
					<tr>
						<td>Id</td>
						<td>Nombre</td>
						<td>Imagen</td>
						<td>Opciones</td>
					</tr>
				</thead>
				<tbody>
					{productsShow?.map((product) => {
						return (
							<tr key={product.id}>
								<td>{product.id}</td>
								<td>{product.name}</td>
								<td>
									<img
										src={product.image}
										style={{ width: "100px", height: "100px" }}
									alt = ''/>
								</td>
								<td>
									<button
										onClick={(event) => {
											productToEdit(product, "edit");
										}}
									>
										editar
									</button>
								</td>
								<td>
									<button
										onClick={() => {
											productToEdit(product, "delete");
										}}
									>
										eliminar
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			<Modal isOpen={editModal}>
				<ModalHeader>
					<div>
						<h3>Editar Producto</h3>
					</div>
				</ModalHeader>
				<ModalBody>
					<div>
						<label>Id</label>
						<input
							readOnly
							type="text"
							name="id"
							value={productSelected?.id}
						></input>
					</div>
					<div>
						<label>Nombre</label>
						<input
							type="text"
							name="name"
							value={productSelected?.name}
							onChange={(event) => {
								handleInput(event);
							}}
						></input>
					</div>
					<div>
						<label>Imagen</label>
						<input
							type="text"
							name="image"
							value={productSelected?.image}
							onChange={(event) => {
								handleInput(event);
							}}
						></input>
					</div>
					{/* <div>
						<label>Aux_images</label>
                        <input></input>
					</div> */}
					<div>
						<label>Description</label>
						<input
							type="text"
							name="description"
							value={productSelected?.description}
							onChange={(event) => {
								handleInput(event);
							}}
						></input>
					</div>
					<div>
						<label>Discount</label>
						<input
							type="number"
							name="discount"
							value={productSelected?.discount}
							onChange={(event) => {
								handleInput(event);
							}}
						></input>
					</div>
					<div>
						<label>Stock</label>
						<input
							type="number"
							name="stock"
							value={productSelected?.stock}
							onChange={(event) => {
								handleInput(event);
							}}
						></input>
					</div>
					<div>
						<label>Price</label>
						<input
							type="number"
							name="price"
							value={productSelected?.price}
							onChange={(event) => {
								handleInput(event);
							}}
						></input>
					</div>
					<div>
						<label>categories</label>
						{allCategories?.map((category) => {
							for (let i = 0; i < productSelected.categories.length; i++) {
								if (category.name === productSelected.categories[i].name) {
									return (
										<div>
											<label>{category.name}</label>
											<input
												checked={true}
												type="checkbox"
												value={category.name}
												name="categories"
												onChange={(event) => {
													handleSelect(event);
												}}
											></input>
										</div>
									);
								}
							}
							return (
								<div>
									<label>{category.name}</label>
									<input
										type="checkbox"
										value={category.name}
										name="categories"
										onChange={(event) => {
											handleSelect(event);
										}}
									></input>
								</div>
							);
						})}
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						onClick={() => {
							postData();
						}}
					>
						Actualizar
					</button>
					<button
						onClick={() => {
							setEditModal(false);
						}}
					>
						Cancelar
					</button>
				</ModalFooter>
			</Modal>

			<Modal isOpen={deleteModal}>
				<ModalBody>
					Estas seguro de que deseas borrar el producto {productSelected?.name}
				</ModalBody>
				<ModalFooter>
					<button
						onClick={() => {
							deleteData();
						}}
					>
						Si
					</button>
					<button
						onClick={() => {
							setDeleteModal(false);
						}}
					>
						No
					</button>
				</ModalFooter>
			</Modal>
		</div>
	);
}
export default EditProduct;
