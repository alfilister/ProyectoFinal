import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { updateProduct, deleteProduct } from "../../redux/actions";

function EditProduct() {
	let auxImg = [];
	const dispatch = useDispatch();

	const allProducts = useSelector((state) => state.products);
	const allCategories = useSelector((state) => state.categories);
	allProducts.sort((a, b) => {
		return a.id - b.id;
	});

	const [productsShow, setProductsShow] = useState(
		allProducts?.filter((product) => !product.featured)
	);
	const [productsFav, setProductsFav] = useState(
		allProducts?.filter((product) => product.featured)
	);
	const [searching, setSearching] = useState(allProducts);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [featureModal, setFeatureModal] = useState(false);
	const [productSelected, setProductSelected] = useState({
		id: "",
		name: "",
		image: "",
		aux_images: [],
		description: "",
		discount: 0,
		stock: 0,
		price: 0,
		featured: false,
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
		var newData = productsShow?.concat(productsFav);
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
			return newData;
		});
		setProductsFav(newData?.filter((product) => product.featured));
		setProductsShow(newData?.filter((product) => !product.featured));
		setSearching(newData);
		setFeatureModal(false);
		setEditModal(false);
	};

	const deleteData = () => {
		dispatch(deleteProduct(productSelected.id));
		setProductsShow(
			productsShow.filter((pro) => pro.id !== productSelected.id)
		);
		// setProductsFav(productsShow.filter((pro) => pro.id !== productSelected.id));
		setSearching(productsShow.filter((pro) => pro.id !== productSelected.id));
		setDeleteModal(false);
	};

	const searchProduct = (event) => {
		const { value } = event.target;
		setSearch(value);
		setProductsShow(() => searching.filter((p) => p.name.includes(value)));
		// setProductsFav(() => searching.filter((p) => p.name.includes(value)));
	};

	function getImage(element) {
		const { files } = element.target;
		if (files.length === 1) {
			var file = files.item(0);
			var reader = new FileReader();
			reader.onloadend = function () {
				setProductSelected({
					...productSelected,
					image: reader.result,
				});
			};
			reader.readAsDataURL(file);
		}
	}

	const read = (file) => {
		var reader = new FileReader();
		reader.onloadend = function () {
			// console.log("RESULTS", reader.result);
			auxImg.push(reader.result);
			// setProductSelected({
			// 	...productSelected,
			// 	aux_images: [...productSelected.aux_images, reader.result],
			// });
		};
		reader.readAsDataURL(file);
	};

	const getMuchImages = (event) => {
		const { files } = event.target;
		if (files) {
			[].forEach.call(files, read);
		}
		setProductSelected({
			...productSelected,
			aux_images: auxImg,
		});
	};

	const changeFeatured = (product, event) => {
		event.preventDefault();
		if (product.featured) {
			setProductSelected({
				...product,
				featured: false,
			});
		} else if (productsFav?.length < 5) {
			setProductSelected({
				...product,
				featured: true,
			});
		} else {
			//alert
			console.log("No se puede añadir");
		}
		setFeatureModal(true);
	};

	return (
		<div className="editProductContainer">
			<h3>Productos destacados</h3>
			{productsFav.length > 0 ? (
				<table class="table table-striped">
					<thead>
						<tr>
							<th className="center" scope="col">
								Id
							</th>
							<th className="center" scope="col">
								Nombre
							</th>
							<th className="center" scope="col">
								Imagen
							</th>
							<th className="center" scope="col">
								Opciones
							</th>
						</tr>
					</thead>
					<tbody>
						{productsFav?.map((product) => {
							return (
								<tr key={product.id}>
									<th className="center" scope="row">
										{product.id}
									</th>
									<td className="center">{product.name}</td>
									<td className="center">
										<img
											src={product.image}
											width="100px"
											height="100px"
											alt="base64 test"
										/>
									</td>
									<td className="center">
										<button
											className="btn"
											onClick={(event) => {
												productToEdit(product, "edit");
											}}
										>
											Editar
										</button>
										<button
											className="btn"
											onClick={(event) => {
												changeFeatured(product, event);
											}}
										>
											{product.featured === true
												? "Eliminar de ⭐"
												: "Agregar a ⭐"}
										</button>
										<button
											className="btn btn-borrar"
											onClick={() => {
												productToEdit(product, "delete");
											}}
										>
											Borrar
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<div>No hay productos destacados</div>
			)}
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
			<Modal isOpen={featureModal}>
				<ModalBody>
					Desea{" "}
					{productSelected.featured ? (
						<span>agregar</span>
					) : (
						<span>eliminar</span>
					)}{" "}
					<strong>{productSelected?.name} </strong>
					{productSelected.featured ? <span>a</span> : <span>de</span>}{" "}
					productos destacados
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-primary"
						onClick={() => {
							postData();
						}}
					>
						Si
					</button>
					<button
						className="btn btn-secondary"
						onClick={() => {
							setFeatureModal(false);
						}}
					>
						No
					</button>
				</ModalFooter>
			</Modal>
			<h3>Todos los productos</h3>
			{productsShow.length > 0 ? (
				<table class="table table-striped">
					<thead>
						<tr>
							<th className="center" scope="col">
								Id
							</th>
							<th className="center" scope="col">
								Nombre
							</th>
							<th className="center" scope="col">
								Imagen
							</th>
							<th className="center" scope="col">
								Opciones
							</th>
						</tr>
					</thead>
					<tbody>
						{productsShow?.map((product) => {
							return (
								<tr key={product.id}>
									<th className="center" scope="row">
										{product.id}
									</th>
									<td className="center">{product.name}</td>
									<td className="center">
										<img
											src={product.image}
											width="100px"
											height="100px"
											alt="base64 test"
										/>
									</td>
									<td className="center">
										<button
											className="btn"
											onClick={(event) => {
												productToEdit(product, "edit");
											}}
										>
											Modificar
										</button>
										<button
											className="btn"
											onClick={(event) => {
												changeFeatured(product, event);
											}}
										>
											{product.featured === true
												? "Eliminar de ⭐"
												: "Agregar a ⭐"}
										</button>
										<button
											className="btn btn-borrar"
											onClick={() => {
												productToEdit(product, "delete");
											}}
										>
											Borrar
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<div>No hay productos que coincidan</div>
			)}

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
							onChange={(event) => {
								getImage(event);
							}}
							type="file"
							name="image"
							accept="image/png, image/jpeg"
						></input>
					</div>
					<div>
						<label>Aux_images</label>
						<input
							onChange={(event) => {
								getMuchImages(event);
							}}
							type="file"
							name="aux_images"
							accept="image/png, image/jpeg"
							multiple
						></input>
					</div>
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
										<div key={category.id}>
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
						className="btn btn-primary"
						onClick={() => {
							postData();
						}}
					>
						Actualizar
					</button>
					<button
						className="btn btn-secondary"
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
						className="btn btn-primary"
						onClick={() => {
							deleteData();
						}}
					>
						Si
					</button>
					<button
						className="btn btn-secondary"
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
