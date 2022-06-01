import CreateProduct from "../../components/Create";
import EditProduct from "../../components/EditProducts";
import CreateEditCategories from "../../components/CreateEditCategories";
import ManageUsers from "../../components/ManageUsers";
import ManageOrder from "../../components/ManageOrder";

function MenuAdmin({ setMenu, menu }) {
	const onButton = (event) => {
		event.preventDefault();
		const buttons = document.getElementsByClassName("btnMenu");
		for (let i = 0; i < buttons.length; i++) {
			console.log(buttons[i].value);
			if (buttons[i].value === event.target.value) {
				buttons[i].disabled = true;
			} else {
				buttons[i].disabled = false;
			}
		}
		switch (event.target.value) {
			case "CreateProduct":
				setMenu({
					panel: <CreateProduct />,
				});
				break;
			case "EditProduct":
				setMenu({
					panel: <EditProduct />,
				});
				break;
			case "CreateEditCategories":
				setMenu({
					panel: <CreateEditCategories />,
				});
				break;
			case "ManageUsers":
				setMenu({
					panel: <ManageUsers />,
				});
				break;
			case "ManageOrder":
				setMenu({
					panel: <ManageOrder />,
				});
				break;
			default:
				break;
		}
	};

	return (
		<div className="menuAdminContainer">
			<button
				className="btnMenu"
				onClick={(event) => onButton(event)}
				value="CreateProduct"
			>
				CreateProduct
			</button>
			<button
				className="btnMenu"
				onClick={(event) => onButton(event)}
				value="EditProduct"
			>
				EditProduct
			</button>
			<button
				className="btnMenu"
				onClick={(event) => onButton(event)}
				value="CreateEditCategories"
			>
				CreateEditCategories
			</button>
			<button
				className="btnMenu"
				onClick={(event) => onButton(event)}
				value="ManageUsers"
			>
				ManageUsers
			</button>
			<button
				className="btnMenu"
				onClick={(event) => onButton(event)}
				value="ManageOrder"
			>
				ManageOrder
			</button>
		</div>
	);
}

export default MenuAdmin;
