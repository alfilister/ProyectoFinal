import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import StarRating from "../../components/createReview/startRating";

import {
  clearDetail,
  getProductsById,
  getReviewsProduct,
  addItemToCart,
  getUsersReview,
} from "../../redux/actions";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const productId = useSelector((state) => state.productsDetail);
  const productReview = useSelector((state) => state.reviewProduct);
  const usersReview = useSelector((state) => state.usersReview);

  //Filtro los Reviews del producto en DETAIL
  const reviewId = productReview
    .filter((el) => Number(id) === el.id)
    .map((el) => el.reviews)
    .flat();

  useEffect(() => {
    setTimeout(() => dispatch(getProductsById(id)), 50);
    setTimeout(() => dispatch(getReviewsProduct()), 50);
    setTimeout(() => dispatch(getUsersReview()), 50);
    dispatch(clearDetail());
  }, [dispatch, id]);

  const handleCart = (e, id) => {
    e.preventDefault();
    console.log("agregado desde details");
    dispatch(addItemToCart(Number(id)));
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
                      <>
                        <div className="imgChicas">
                          <img src={el} alt="imagenes auxiliares" />;
                        </div>
                      </>
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
                <p className="categorias">{`| ${productId.categories?.map(
                  (el) => ` ${el.name}`
                )} |`}</p>
                <div className="btnCrt">
                  <button onClick={(e) => handleCart(e, id)}>
                    Add To Cart
                  </button>
                </div>
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
                <div>
                  <h1>
                    There are no yet reviews, buy the item and be the first in
                    comment!
                  </h1>
                </div>
              )}
              <Link to="/reviewsPost">
                <button>Add Review</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
