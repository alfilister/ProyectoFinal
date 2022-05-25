import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuAdmin from "../../components/MenuAdmin";
import CreateProduct from "../../components/Create";
import {
	getCategories,
	getOrdersFromDb,
	getProducts,
	getUserById,
} from "../../redux/actions";

function ControlPanel(idUser) {
	const dispatch = useDispatch();

	const [menu, setMenu] = useState({
		panel: <CreateProduct />,
	});

	useEffect(() => {
		// dispatch(getUserById((idUser = 1)));
		dispatch(getCategories());
		dispatch(getProducts());
		dispatch(getOrdersFromDb());
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
