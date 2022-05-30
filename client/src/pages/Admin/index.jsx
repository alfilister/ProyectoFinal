import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuAdmin from "../../components/MenuAdmin";
import CreateProduct from "../../components/Create";
import {
	getAllUsers,
	getCategories,
	getOrdersFromDb,
	getProducts,
	getUserById,
} from "../../redux/actions";

function ControlPanel(idUser) {
	const dispatch = useDispatch();
/// EDITE ESTO PARA QUE NO APAREZCA EN Routa /controlPanel directamente el component createProduct 
/* 	const [menu, setMenu] = useState({
		panel: <CreateProduct />,
	}); */

	const [menu, setMenu] = useState({
		panel: <h5>
		WELCOME ADMINISTRATOR</h5>,
	});

	useEffect(() => {
		// dispatch(getUserById((idUser = 1)));
		dispatch(getCategories());
		dispatch(getProducts());
		dispatch(getOrdersFromDb());
		dispatch(getAllUsers())
	}, [menu]);

	const userRef = useSelector((state) => state.user);

	const adminValidate = () => {
		return userRef.role;
	};

	return (
		<div>
			<MenuAdmin setMenu={setMenu} menu={menu} />
			{menu.panel}
		</div>
	);
}

export default ControlPanel;
