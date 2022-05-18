import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Nav from "../../components/Nav"

import {
  clearDetail,
  getProductsById,
  getReviewsProduct,
} from "../../redux/actions"

const Detail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const productId = useSelector((state) => state.productsDetail)
  const productReview = useSelector((state) => state.reviewProduct)

  useEffect(() => {
    setTimeout(() => dispatch(getProductsById(id)), 50)
    setTimeout(() => dispatch(getReviewsProduct()), 50)
    dispatch(clearDetail())
  }, [dispatch, id])

  //Filtro los Reviews del producto en DETAIL
  const reviewId = productReview
    .filter((el) => id == el.id)
    .map((el) => el.reviews)
    .flat()

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
                    )
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
                <p>
                  ⭐
                  {!productId.rating
                    ? "Este producto todavia no tiene calificacion"
                    : productId.rating}
                </p>
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
                      <div>
                        <label className="label">
                          <span className="span">
                            <h3>NombreUsuario</h3>
                            <p> dice...</p>
                          </span>
                          <span className="span">⭐{r.score_review}</span>
                        </label>
                        <p className="p">{r.product_review}</p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div>
                  <h1>No hay reviews aún! Se el primero en opinar!!</h1>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Detail
