import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getOrdersFromDb, updateUser } from "../../redux/actions";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditarUser = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersFromDb());
  }, []);

  const infoUser = useSelector((state) => state.allUsers);
  const ordersDb = useSelector((state) => state.ordersDb);

  const email = user && user.email;

  const ordersUser =
    ordersDb[0] &&
    ordersDb.filter(
      (el) => el.user.email === email && el.status !== "attempted"
    );

  console.log("orderUser", ordersUser);

  const userFilterbyId =
    infoUser && infoUser.filter((el) => el.email === email);

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    id_document: "",
    password: "",
    image: "",
  });

  function handleChangeInput(e) {
    e.preventDefault();
    setInput({
      fullName: userFilterbyId[0] && userFilterbyId[0].fullName,
      email: userFilterbyId[0] && userFilterbyId[0].email,
      id_document: e.target.value,
      password: userFilterbyId[0] && userFilterbyId[0].password,
      image: userFilterbyId[0] && userFilterbyId[0].image,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUser(input));
    dispatch(getAllUsers());
    Swal.fire({
      icon: "success",
      title: "Complete!",
      text: "Document saved successfully!",
      confirmButtonText: "Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
    // alert("Documento guardado con exito");
    // window.location.reload();
    setInput({
      fullName: "",
      email: "",
      id_document: "",
      password: "",
      image: "",
    });
  }

  return (
    <div className="editUser">
      {userFilterbyId[0] ? (
        <div>
          <div className="profileInfo">
            <img className="img" src={userFilterbyId[0].image} alt="" />
            <h3>User: {userFilterbyId[0].fullName}</h3>
            <h3>Email: {userFilterbyId[0].email}</h3>
          </div>

          {userFilterbyId[0].id_document ? (
            <h3 className="document">
              Document: {userFilterbyId[0].id_document}
            </h3>
          ) : (
            <div className="idInput">
              <input
                type="text"
                placeholder="Set your ID for tickets"
                name="id_document"
                value={input.id_document}
                onChange={(e) => handleChangeInput(e)}
              />
              <button onClick={(e) => handleSubmit(e, input)}>save</button>
            </div>
          )}

          {ordersUser[0] ? (
            ordersUser.map((order) => (
              <div className="ordersContainer">
                <div key={order.id} className="userOrders">
                  <div className="orderNumber">
                    <h2>Order #{order.id}0</h2>
                  </div>
                  <div className="itemContainer">
                    {order.cart_list.map((el) => (
                      <div className="cartItems">
                        <h3 onClick={() => navigate(`/producto/${el[0]}`)}>
                          Item: {el[1]}
                        </h3>
                        <h3>Value: $ {el[2]}</h3>
                        <h3>Quantity: {el[3]}</h3>
                      </div>
                    ))}
                  </div>
                  <div className="paidStatus">
                    <h3>
                      Total Paid: <span> $ {order.total_purchase}</span>
                    </h3>
                    <h3>
                      Status: <span>{order.status}</span>
                    </h3>
                  </div>
                  {order.status === "active" && (
                    <div className="activeMsg">
                      <p>
                        Rigth now, our staff is carefully preparing your items
                        to be send as soon as posible
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>Loading orders...</div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default EditarUser;
