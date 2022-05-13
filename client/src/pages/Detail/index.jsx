import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Nav from "../../components/Nav";

import { getProductsById } from "../../redux/actions";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const productId = useSelector((state) => state.productsDetail);

  useEffect(() => {
    setTimeout(() => dispatch(getProductsById(id)), 3000);
    return () => dispatch(getProductsById());
  }, [dispatch, id]);

  return (
    <>
      <Nav />
      <div className="contenedorDetail">
        {!productId ? (
          <img
            src="https://i.imgur.com/EQSYdeQ.gif"
            alt="Loading..."
            className="loaderDetail"
          />
        ) : (
          <div className="detail">
            <h1>{productId.name}</h1>
            <h1>{`$ ${productId.price}`}</h1>
            <div className="imagenDetalle">
              <img
                src={productId.image}
                alt=""
                height="300px"
                width="500px"
                className="imgDetalle"
              />
            </div>
            <label className="subtitle">Rating:</label>
            <p className="text">{productId.rating}</p>
            <br />
            <label className="subtitle">Descripción:</label>
            <p className="text">{productId.description}</p>
            <br />
            <label className="subtitle">Cantidad en Stock:</label>
            <p className="text">{productId.stock}</p>
            <br />
            <label className="subtitle">Descuento:</label>
            <p className="text">
              {productId.discount ? productId.discount : "No hay descuentos!"}
            </p>
            <label className="subtitle">Categorias:</label>
            <p className="text">{productId.categories?.map((el) => el.name)}</p>
            <br />
            <label className="subtitle">Reviews:</label>
            <p className="text">Debo renderizar las Reviews aún</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Detail;
