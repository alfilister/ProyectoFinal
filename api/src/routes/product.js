const { Router } = require("express")
const {
  getApiInfo,
  chargeProductsDb,
  postProduct,
  getProductsDb,
  searchProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers")

const router = Router()

// RUTA PARA TRAER LOS PRODUCTOS DE LA API (IMPORTANTE QUE ANTES DE HACER ESTE LLAMADO SE HAGA EL GET DE LAS CATEGORÍAS, YA QUE ELLAS ALIMENTAN ESA TABLA INTERMEDIA)
router.get("/", async (req, res, next) => {
  try {
    const result = await getApiInfo()
    const dataDb = await chargeProductsDb(result)

    res.json({
      status: "Api info loaded",
      data: dataDb,
    })
  } catch (err) {
    next(err)
  }
})

// RUTA PARA CARGAR Y MOSTRAR LOS PRODUCTOS TAL COMO QUEDAN EN LA BASE DE DATOS (INCLUYENDO CATEGORÍA ÚNICAMENTE, PARA VER LOS REVIEWS DE PRODUCTO DEBEN HACER LA SOLICITUD DE PRODUCT BY ID)
router.get("/info", async (req, res, next) => {
  try {
    const dataDb = await getProductsDb()

    res.json({
      status: "Api info loaded",
      data: dataDb,
    })
  } catch (err) {
    next(err)
  }
})

// RUTA QUE TRAE LOS DETALLES DEL PRODUCTO, INCLUYENDO LAS CATEGORÍAS Y REVIEWS
router.get("/:id", async (req, res, next) => {
  try {
    const response = await searchProductById(req.params.id)
    res.json({
      status: "Found",
      data: response,
    })
  } catch (error) {
    next(error)
  }
})

//RUTA PARA CREAR LOS PRODUCTOS (EN LOS CONTROLADORES DE PRODUCT EN LA LÍNEA 62 ENCUENTRAN LA DATA QUE DEBEN SUMINISTRAR (IMPORTANTE QUE LA CATEGORÍA A INCLUIR EXISTA DENTRO DE LA BASE DE DATOS))
router.post("/", async (req, res, next) => {
  try {
    const productCreate = await postProduct(req.body)
    res.status(201).json({
      status: "Product succesfully reated",
      dataProvided: productCreate,
    })
  } catch (err) {
    next(err)
  }
})

// RUTA PARA MODIFICAR UN PRODUCTO (EN EL FRONT CUANDO SE ENTRE A ESTA INSTANCIA SE DEBEN CARGAR LOS DATOS PREVIOS EN LOS CAMPOS PARA QUE AL MOMENTO DE HACER EL LLAMADO A LA RUTA LA INFO ESTÉ COMPLETA Y SEA MÁS AMABLE AL USUARIO VER LO QUE HAY Y LO QUE VA A CAMBIAR)
router.put("/:id", async (req, res, next) => {
  const { id } = req.params
  const {
    name,
    image,
    price,
    aux_images,
    description,
    discount,
    stock,
    rating,
    category,
  } = req.body
  try {
    const update = await updateProduct(
      id,
      name,
      image,
      price,
      aux_images,
      description,
      discount,
      stock,
      rating,
      category
    )
    res.json({ data: update })
  } catch (error) {
    next(error)
  }
})

// RUTA PARA ELIMINAR PRODUCTO
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    await deleteProduct(id)
    res.send("Product succesfully deleted")
  } catch (error) {
    next(error)
  }
})

module.exports = router
