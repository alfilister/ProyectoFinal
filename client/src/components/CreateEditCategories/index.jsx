import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { createCategory, editCategory } from "../../redux/actions";

function CreateEditCategories() {
	const dispatch = useDispatch();
	const allCategories = useSelector((state) => state.categories);

	const [newCateogry, setNewCategory] = useState(false);
	const [nameCategory, setNameCategory] = useState({ nameCategory: "" });
	const [showCategories, setShowCategories] = useState(allCategories);
	const [editModal, setEditModal] = useState(false);
	const [categorySelected, setCategorySelected] = useState({
		id: "",
		name: "",
	});

	showCategories.sort((a, b) => {
		if (a.name.toLowerCase() > b.name.toLowerCase()) {
			return 1;
		} else {
			if (a.name.toLowerCase() < b.name.toLowerCase()) {
				return -1;
			}
		}
		return 0;
	});

	const handleCategory = (event) => {
		const { value } = event.target;
		setNameCategory({ nameCategory: value });
	};

	const createCat = () => {
		if (!newCateogry) {
			setNewCategory(true);
		} else {
			dispatch(createCategory(nameCategory));
			setShowCategories([
				...showCategories,
				{ name: nameCategory.nameCategory },
			]);
			setNewCategory(false);
		}
	};

	const editCategorylocal = (category) => {
		console.log(category);
		setCategorySelected(category);
		setEditModal(true);
	};

	const handleEdit = (event) => {
		const { value } = event.target;
		setCategorySelected({
			...categorySelected,
			name: value,
		});
	};

	const changeCategory = () => {
		dispatch(editCategory(categorySelected));
		setEditModal(false);
		const newData = showCategories;
		newData.map((c) => {
			if (c.id === categorySelected.id) {
				c.name = categorySelected.name;
			}
			return newData;
		});
		setShowCategories(newData);
	};

	return (
		<div className="editCategories">
			<button
				className="btn"
				onClick={() => {
					createCat();
				}}
			>
				Nueva categoria
			</button>
			<table class="table table-striped">
				<thead>
					<tr>
						<th className="center" scope="col">
							Nombre
						</th>
						<th className="center" scope="col">
							Editar
						</th>
					</tr>
				</thead>
				<tbody>
					{showCategories?.map((category) => {
						return (
							<tr>
								<td className="center">{category.name}</td>
								<td className="center">
									<button
										className="btn"
										onClick={() => {
											editCategorylocal(category);
										}}
									>
										🖊
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<Modal isOpen={newCateogry}>
				<ModalBody>
					<div class="mb-3">
						<label class="form-label">Nombre de la categoria nueva</label>
						<input
							class="form-control"
							type="text"
							value={nameCategory.name}
							onChange={(event) => {
								handleCategory(event);
							}}
						></input>
					</div>
				</ModalBody>
				<ModalFooter>
					<button class="btn btn-primary" onClick={() => createCat()}>
						Crear
					</button>
					<button class="btn btn-danger" onClick={() => setNewCategory(false)}>
						Cancelar
					</button>
				</ModalFooter>
			</Modal>

			<Modal isOpen={editModal}>
				<ModalBody>
					<div class="mb-3">
						<label class="form-label">Nuevo nombre:</label>
						<input
							class="form-control"
							type="text"
							value={categorySelected.name}
							onChange={(event) => {
								handleEdit(event);
							}}
						></input>
					</div>
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-primary" onClick={() => changeCategory()}>
						Crear
					</button>
					<button
						className="btn btn-danger"
						onClick={() => setEditModal(false)}
					>
						Cancelar
					</button>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export default CreateEditCategories;
