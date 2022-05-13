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
    setTimeout(() => dispatch(getProductsById(id)), 2000);
    return () => dispatch(getProductsById());
  }, [dispatch, id]);

  return (
    <>
      <Nav />
      <div className="detailContainer">
        {!productId ? (
          <img
            src="https://i.imgur.com/EQSYdeQ.gif"
            alt="Loading..."
            className="loaderDetail"
          />
        ) : (
          <div className="detail">
            <div className="contenedorImagenDescription">
              <div className="imagenDetalle">
                <img src={productId.image} alt="" className="imgDetail" />
              </div>
              <div className="contenedorDescription">
                <h1>{productId.name}</h1>
                <h1>{`$ ${productId.price}`}</h1>
                <label className="subtitle">Rating:</label>
                <p className="text">{productId.rating}</p>
                <br />
                <label className="subtitle">Cantidad en Stock:</label>
                <p className="text">{productId.stock}</p>
                <br />
                <label className="subtitle">Descuento:</label>
                <p className="text">
                  {productId.discount
                    ? productId.discount
                    : "No hay descuentos!"}
                </p>
                <label className="subtitle">Categorias:</label>
                <p className="text">
                  {productId.categories?.map((el) => el.name)}
                </p>
                <br />

                <label className="subtitle">Descripción:</label>
                <p className="text">{productId.description}</p>
                <label className="subtitle">Reviews:</label>
              </div>
            </div>
            <div className="reviews">
              <br />
              <div className="usuario">
                <img
                  src="https://i.imgur.com/DpmcwrK.png"
                  alt="Loading..."
                  className="img"
                  height="30px"
                  width="30px"
                />
                <div>
                  <label className="label">
                    <span className="span">
                      <h3>User456</h3>
                      <p>dice...</p>
                    </span>
                    <span className="span"> Puntaje: 1 - 5</span>
                  </label>
                  <p className="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam non accumsan magna. Proin vel augue sit amet velit
                    lacinia malesuada sit amet vitae libero. Duis sapien lectus,
                    accumsan quis bibendum sed, mollis non ante. Maecenas eu
                    risus fermentum, mollis neque eget, laoreet mauris. Maecenas
                    non mattis ante. Vivamus fermentum volutpat lacus vel
                    rutrum.{" "}
                  </p>
                </div>
              </div>
              <br />
              <div className="usuario">
                <img
                  src="https://i.imgur.com/DpmcwrK.png"
                  alt="Loading..."
                  className="img"
                  height="30px"
                  width="30px"
                />
                <div>
                  <label className="label">
                    <span className="span">
                      <h3>User456</h3>
                      <p>dice...</p>
                    </span>
                    <span className="span"> Puntaje: 1 - 5</span>
                  </label>
                  <p className="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam non accumsan magna. Proin vel augue sit amet velit
                    lacinia malesuada sit amet vitae libero. Duis sapien lectus,
                    accumsan quis bibendum sed, mollis non ante. Maecenas eu
                    risus fermentum, mollis neque eget, laoreet mauris. Maecenas
                    non mattis ante. Vivamus fermentum volutpat lacus vel
                    rutrum.{" "}
                  </p>
                </div>
              </div>
              <br />
              <div className="usuario">
                <img
                  src="https://i.imgur.com/DpmcwrK.png"
                  alt="Loading..."
                  className="img"
                  height="30px"
                  width="30px"
                />
                <div>
                  <label className="label">
                    <span className="span">
                      <h3>User456</h3>
                      <p>dice...</p>
                    </span>
                    <span className="span"> Puntaje: 1 - 5</span>
                  </label>
                  <p className="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam non accumsan magna. Proin vel augue sit amet velit
                    lacinia malesuada sit amet vitae libero. Duis sapien lectus,
                    accumsan quis bibendum sed, mollis non ante. Maecenas eu
                    risus fermentum, mollis neque eget, laoreet mauris. Maecenas
                    non mattis ante. Vivamus fermentum volutpat lacus vel
                    rutrum.{" "}
                  </p>
                </div>
              </div>
              <br />
              <div className="usuario">
                <img
                  src="https://i.imgur.com/DpmcwrK.png"
                  alt="Loading..."
                  className="img"
                  height="30px"
                  width="30px"
                />
                <div>
                  <label className="label">
                    <span className="span">
                      <h3>User456</h3>
                      <p>dice...</p>
                    </span>
                    <span className="span"> Puntaje: 1 - 5</span>
                  </label>
                  <p className="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam non accumsan magna. Proin vel augue sit amet velit
                    lacinia malesuada sit amet vitae libero. Duis sapien lectus,
                    accumsan quis bibendum sed, mollis non ante. Maecenas eu
                    risus fermentum, mollis neque eget, laoreet mauris. Maecenas
                    non mattis ante. Vivamus fermentum volutpat lacus vel
                    rutrum.{" "}
                  </p>
                </div>
              </div>
              <br />
              <div className="usuario">
                <img
                  src="https://i.imgur.com/DpmcwrK.png"
                  alt="Loading..."
                  className="img"
                  height="30px"
                  width="30px"
                />
                <div>
                  <label className="label">
                    <span className="span">
                      <h3>User456</h3>
                      <p>dice...</p>
                    </span>
                    <span className="span"> Puntaje: 1 - 5</span>
                  </label>
                  <p className="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam non accumsan magna. Proin vel augue sit amet velit
                    lacinia malesuada sit amet vitae libero. Duis sapien lectus,
                    accumsan quis bibendum sed, mollis non ante. Maecenas eu
                    risus fermentum, mollis neque eget, laoreet mauris. Maecenas
                    non mattis ante. Vivamus fermentum volutpat lacus vel
                    rutrum.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Detail;
