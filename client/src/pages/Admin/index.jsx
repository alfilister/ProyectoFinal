import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuAdmin from "../../components/MenuAdmin";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  getCategories,
  getOrdersFromDb,
  getProducts,
  getUserById,
} from "../../redux/actions";

function ControlPanel(idUser) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /// EDITE ESTO PARA QUE NO APAREZCA EN Routa /controlPanel directamente el component createProduct
  /* 	const [menu, setMenu] = useState({
		panel: <CreateProduct />,
	}); */

  const [menu, setMenu] = useState({
    panel: <h5>WELCOME ADMIN</h5>,
  });

  useEffect(() => {
    // dispatch(getUserById((idUser = 1)));
    dispatch(getCategories());
    dispatch(getProducts());
    dispatch(getOrdersFromDb());
    dispatch(getAllUsers());
  }, [menu]);

  const userRef = useSelector((state) => state.userEmailId);
  const allUsers = useSelector((state) => state.allUsers);
  const authReact = useSelector((state) => state.isAuthenticated);

  const adminValidate = () => {
    if (authReact) {
      try {
        const userValidate =
          allUsers[0] && allUsers?.filter((user) => user.id === userRef);
        if (userValidate[0]?.role === "Admin") {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: "No tienes acceso a esta pagina",
          confirmButtonText: "Accept",
        }).then((result) => {
          if (result.isConfirmed) {
            //navigate("/");
          }
        });
      }
    }
  };

  return (
    <div>
      {adminValidate() ? (
        <div className="adminContainer">
          <div className="menuAdminContainer">
            <MenuAdmin setMenu={setMenu} menu={menu} />
          </div>
          <div className="menuPanelContainer">{menu.panel}</div>
        </div>
      ) : (
        <div>
          {" "}
          <h1>You need to be logged and have admin access to get this page</h1>
        </div>
      )}
    </div>
  );
}

export default ControlPanel;
