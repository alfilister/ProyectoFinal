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
    <div className="contenedorDetalleLoader">
      <Nav />
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
                      : "No hay descuentos aún!"
                  }`}</p>
                </div>
                <p>{`⭐ ${productId.rating}`}</p>
                <label>Stock:</label>
                <p className="stock" style={{ border: "1px solid black" }}>
                  {productId.stock}
                </p>
                <label>Categorias:</label>
                <p className="categorias">{`| ${productId.categories?.map(
                  (el) => ` ${el.name}`
                )} |`}</p>
                <div className="descripcion">
                  <h2>Descripción:</h2>
                  <p className="text">{productId.description}</p>
                </div>
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
    </div>
  );
};

export default Detail;
