const { Router } = require("express")
const productController = require("../controllers/product")

const router = Router()

// RUTA PARA CARGAR Y MOSTRAR LOS PRODUCTOS TAL COMO QUEDAN EN LA BASE DE DATOS (INCLUYENDO CATEGORÍA ÚNICAMENTE, PARA VER LOS REVIEWS DE PRODUCTO DEBEN HACER LA SOLICITUD DE PRODUCT BY ID)
router.get("/", async (req, res, next) => {

  const { nameProduct } = req.query

  try {
    if(!nameProduct){
      const info = await productController.getProductInfo()
      res.json({
        status: "Api info loaded",
        quantity_found: info.length,
        results: info,
      })
    }else{
      const info = await productController.searchProductByName(nameProduct.toLowerCase())
      info.length>0?res.json({
        status: "Api info loaded",
        quantity_found: info.length,
        results: info,
      })
      :res.status(404).json({
        status: "notFound",
        results: []
      })
    }
  } catch (error) {
    next(error)
  }
})

// RUTA QUE TRAE LOS DETALLES DEL PRODUCTO POR ID, INCLUYENDO LAS CATEGORÍAS Y REVIEWS
router.get("/detail/:idProduct", async (req, res, next) => {
  try {
    const response = await productController.searchProductById(req.params.idProduct)
    res.json({
      status: "Found",
      results: response,
    })
  } catch (error) {
    next(error)
  }
})

//RUTA PARA CREAR LOS PRODUCTOS (EN LOS CONTROLADORES DE PRODUCT EN LA LÍNEA 62 ENCUENTRAN LA DATA QUE DEBEN SUMINISTRAR (IMPORTANTE QUE LA CATEGORÍA A INCLUIR EXISTA DENTRO DE LA BASE DE DATOS))
router.post("/createProduct", async (req, res, next) => {
  try {
    const productCreate = await productController.postProduct(req.body)
    res.status(201).json({
      status: "Product succesfully reated",
      results: productCreate,
    })
  } catch (err) {
    next(err)
  }
})

// RUTA PARA MODIFICAR UN PRODUCTO (EN EL FRONT CUANDO SE ENTRE A ESTA INSTANCIA SE DEBEN CARGAR LOS DATOS PREVIOS EN LOS CAMPOS PARA QUE AL MOMENTO DE HACER EL LLAMADO A LA RUTA LA INFO ESTÉ COMPLETA Y SEA MÁS AMABLE AL USUARIO VER LO QUE HAY Y LO QUE VA A CAMBIAR)
router.put("/:idProduct", async (req, res, next) => {
  const { idProduct } = req.params
  const {
    name,
    image,
    price,
    aux_images,
    description,
    discount,
    stock,
    rating,
    categories,
  } = req.body
  
  try {
    const updated = await productController.updateProduct(
      idProduct,
      name,
      image,
      price,
      aux_images,
      description,
      discount,
      stock,
      rating,
      categories
    )
    res.json({ results: updated })
  } catch (error) {
    next(error)
  }
})

// RUTA PARA ELIMINAR PRODUCTO
router.delete("/:idProduct", async (req, res, next) => {
  const { idProduct } = req.params
  try {
    const result = await productController.deleteProduct(idProduct)
    res.send({results: result})
  } catch (error) {
    next(error)
  }
})

//FILTRO POR CATEGORIAS Y PRECIO PARA EL HOME
router.get("/filter", async (req, res, next) => {
  const { categoryName, price } = req.query
  try {
    const result = await productController.filterProducts(categoryName, price)

    result[0]
      ? res.json({ quantity: result.length, data: result })
      : res.status(404).send("No coincidences")
  } catch (error) {
    next(error)
  }
})

module.exports = router
