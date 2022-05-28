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
    dispatch(getAllUsers());
    dispatch(getOrdersFromDb());
  }, [dispatch]);

  const infoUser = useSelector((state) => state.allUsers);
  const ordersDb = useSelector((state) => state.ordersDb);

  const email = user && user.email;

  const ordersUser =
    ordersDb[0] &&
    ordersDb.filter(
      (el) => el.user.email === email && el.status !== "attempted"
    );

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
        dispatch(getAllUsers());
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

  const [viewOrders, setView] = useState("hidden");

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

          {ordersUser[0] && (
            <div className="ordersController">
              <h1>Click to see your oders</h1>
              <div className="btns">
                <button onClick={() => setView("active")}>Active</button>
                <button onClick={() => setView("dispatched")}>
                  Dispatched
                </button>
                <button onClick={() => setView("complete")}>Complete</button>
                <button onClick={() => setView("hidden")}>Hide Orders</button>
              </div>
            </div>
          )}

          {viewOrders === "hidden" && <div></div>}

          {viewOrders === "active" &&
            ordersUser
              .filter((order) => order.status === "active")
              .map((order) => (
                <div className="activeContainer">
                  <div key={order.id} className="userOrders">
                    <div className="orderNumber">
                      <h2>Order #{order.id}0</h2>
                    </div>
                    <div className="itemContainer">
                      {order.cart_list.map((el) => (
                        <div
                          className="cartItems"
                          onClick={() => navigate(`/producto/${el[0]}`)}
                        >
                          <h3>Item: {el[1]}</h3>
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
                      <h3>
                        Date purchase:{" "}
                        <span>{order.updatedAt.slice(0, 10)}</span>
                      </h3>
                      <h3>
                        Time purchase:{" "}
                        <span>{order.updatedAt.slice(14, 19)}</span>
                      </h3>
                    </div>
                    <div className="activeMsg">
                      <p>
                        Right now, our staff is carefully preparing your items
                        to be send as soon as posible
                      </p>
                    </div>
                  </div>
                </div>
              ))}

          {viewOrders === "dispatched" &&
            ordersUser
              .filter((order) => order.status === "dispatched")
              .map((order) => (
                <div className="dispatchedContainer">
                  <div key={order.id} className="userOrders">
                    <div className="orderNumber">
                      <h2>Order #{order.id}0</h2>
                    </div>
                    <div className="itemContainer">
                      {order.cart_list.map((el) => (
                        <div
                          className="cartItems"
                          onClick={() => navigate(`/producto/${el[0]}`)}
                        >
                          <h3>Item: {el[1]}</h3>
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
                      <h3>
                        Date purchase:{" "}
                        <span>{order.updatedAt.slice(0, 10)}</span>
                      </h3>
                      <h3>
                        Time purchase:{" "}
                        <span>{order.updatedAt.slice(14, 19)}</span>
                      </h3>
                    </div>
                    <div className="activeMsg">
                      <p>
                        Your package is on the way, our delivery service gonna
                        be there in the short term
                      </p>
                    </div>
                  </div>
                </div>
              ))}

          {viewOrders === "complete" &&
            ordersUser
              .filter((order) => order.status === "complete")
              .map((order) => (
                <div className="completeContainer">
                  <div key={order.id} className="userOrders">
                    <div className="orderNumber">
                      <h2>Order #{order.id}0</h2>
                    </div>
                    <div className="itemContainer">
                      {order.cart_list.map((el) => (
                        <div
                          className="cartItems"
                          onClick={() => navigate(`/producto/${el[0]}`)}
                        >
                          <h3>Item: {el[1]}</h3>
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
                      <h3>
                        Date purchase:{" "}
                        <span>{order.updatedAt.slice(0, 10)}</span>
                      </h3>
                      <h3>
                        Time purchase:{" "}
                        <span>{order.updatedAt.slice(14, 19)}</span>
                      </h3>
                    </div>

                    <div className="activeMsg">
                      <p>Wish you the best experience with our products</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default EditarUser;
