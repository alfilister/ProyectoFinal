import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import StarRating from "../../components/createReview/startRating";
import RenderReviewCreate from "../../components/createReview/renderReviewCreate";
import Modal from "../../components/Modal";

import {
  clearDetail,
  getProductsById,
  getReviewsProduct,
  addItemToCart,
  getUsersReview,
  getUsersByEmail,
  addItemToCartLocalStorage,
  addCounterLocalStorage,
} from "../../redux/actions";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  //info del usuario para conseguir Id, y para postear reviews o registrarse en caso de no estar loggeado
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const productId = useSelector((state) => state.productsDetail); //producto por id (detail)
  const productReview = useSelector((state) => state.reviewProduct); //productos con reviews
  const usersReview = useSelector((state) => state.usersReview); //id de usuario y nombre review
  const ordersDb = useSelector((state) => state.ordersDb);

  //CAPTURAR ID Y EMAIL DE USUARIO AUTENTICADO
  const bucket = [];
  isAuthenticated && bucket.push({ email: user.email, name: user.name });
  //ingreso al bucket, que tiene tanto el email como el name y consigo el email
  const emailUser = bucket[0] && bucket[0].email;

  //traigo los datos filtrados en redux
  const idUserAuth = useSelector((state) => state.userEmailId);

  //Función validadora de si el usuario logueado ha realizado compras sobre el item en el que se encuentra
  const purchaseValidation = (productId, emailUser, orderArray) => {
    const inOrder = orderArray.filter((el) => el.user.email == emailUser);
    if (inOrder[0]) {
      const productCheck = inOrder.filter((el) =>
        el.products_id.includes(Number(productId))
      );
      if (productCheck[0]) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  //ESTADO LOCAL PARA CONTROLAR VENTANAS MODALES
  //(abrir cerrar modal) SI ESTA AUTENTICADO
  const [modalReview, setModalReview] = useState(false);
  //(abrir cerrar modal) NO ESTA AUTENTICADO
  const [modalLogin, setModalLogin] = useState(false);

  //Filtro las Reviews del producto DETAIL
  const reviewId =
    productReview[0] &&
    productReview
      .filter((el) => Number(id) === el.id)
      .map((el) => el.reviews)
      .flat();

  useEffect(() => {
    setTimeout(() => dispatch(getProductsById(id)), 1000);
    dispatch(getReviewsProduct());
    dispatch(getUsersReview());
    dispatch(getUsersByEmail(emailUser));
    return () => {
      dispatch(clearDetail());
    };
  }, []);

  const handleCart = (e, id) => {
    e.preventDefault();
    console.log("agregado desde details");
    dispatch(addItemToCart(Number(id)));
    dispatch(addItemToCartLocalStorage());
    dispatch(addCounterLocalStorage());
  };

  return (
    <div className="contenedorDetalleLoader">
      <div className="detailContainer">
        {productId.length === 0 ? (
          <img
            src="https://i.imgur.com/EQSYdeQ.gif"
            alt="Loading..."
            className="loaderDetail"
          />
        ) : (
          <div className="detail">
            <div className="contenedorImagenDescription">
              <div className="imagenDetalle">
                <div className="imgGrande">
                  <img src={productId.image} alt="" />
                </div>
                <div className="imagesAux">
                  {productId.aux_images?.map((el) => {
                    return (
                      <div>
                        <div className="imgChicas">
                          <img src={el} alt="imagenes auxiliares" />;
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="contenedorDescription">
                <h1 className="tituloDetail">{productId.name}</h1>
                <div className="precioDescuento">
                  <h2 className="precio">{`$ ${productId.price}`}</h2>
                  <p className="descuento">{`${
                    productId.discount
                      ? `${productId.discount} % OFF`
                      : "No discounts at the moment!"
                  }`}</p>
                </div>
                {!productId.rating ? (
                  <p>Este producto todavia no tiene calificacion</p>
                ) : (
                  <div>
                    <StarRating stars={productId.rating} />
                  </div>
                )}
                <label>Stock:</label>
                <p className="stock" style={{ border: "1px solid black" }}>
                  {productId.stock}
                </p>
                <label>Categories:</label>
                <div className="categorias">
                  {productId.categories?.map((el) => (
                    <p key={el.id}> | {el.name} | </p>
                  ))}
                </div>
                {productId.stock ? (
                  <div className="btnCrt">
                    <button onClick={(e) => handleCart(e, id)}>
                      Add To Cart
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="descripcion">
                  <h2>Description:</h2>

                  <p className="text">{productId.description}</p>
                </div>
              </div>
            </div>

            <div className="reviews">
              {reviewId.length >= 1 ? (
                reviewId.map((r) => {
                  return (
                    <div key={r.id} className="usuario">
                      <img
                        src="https://i.imgur.com/DpmcwrK.png"
                        alt="Loading..."
                        className="img"
                        height="30px"
                        width="30px"
                      />
                      <div className="ConteinerUser">
                        <label className="label">
                          <span className="span">
                            {usersReview?.map((el) => {
                              if (el.id === r.user_id)
                                return <h3>{el.fullName}</h3>;
                            })}
                            <p>Says...</p>
                          </span>
                          <div className="starReview">
                            <StarRating stars={r.score_review} />
                          </div>
                        </label>
                        <p className="p">{r.product_review}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                // Mensaje en caso de que no hayan reviews del producto aún
                <div>
                  <h1>
                    There are no yet reviews, buy the item and be the first in
                    comment!
                  </h1>
                </div>
              )}
              {/* SWITCH de boton dependiendo rol del Usuario */}
              {isAuthenticated ? (
                <button onClick={() => setModalReview(!modalReview)}>
                  Add Review
                </button>
              ) : (
                <button onClick={() => setModalLogin(!modalLogin)}>
                  Add Review
                </button>
              )}
            </div>
          </div>
        )}
        {/* Modal para usuario autenticado */}
        <Modal
          estado={modalReview}
          cambiarEstado={setModalReview}
          titulo="Send your review!"
        >
          {purchaseValidation(id, emailUser, ordersDb, idUserAuth) ? (
            <div className="contenidoModal">
              <RenderReviewCreate idProduct={id} idUser={idUserAuth} />
            </div>
          ) : (
            <div>This item has not been purchased by you</div>
          )}
        </Modal>
        {/* Modal para usuario NO autenticado */}
        <Modal
          estado={modalLogin}
          cambiarEstado={setModalLogin}
          titulo="Sorry!"
        >
          <div className="contenidoModal">
            <p>
              We are very sorry, but to be able to comment you need to be logged
              in and have bought this product!
            </p>
            <button onClick={() => loginWithRedirect()}>
              Log In or Sign Up
            </button>
            <button onClick={() => setModalLogin(!modalLogin)}>Accept</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Detail;
