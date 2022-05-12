const { Router } = require("express")
const {
  getCategory,
  chargeCategoriesDb,
  postCategory,
  deleteCategory,
  updateCategory,
  filterProducts
} = require("../controllers")

const router = Router()

// RUTA PARA CARGAR Y OBTENER LAS CATEGORÍAS
router.get("/", async (req, res, next) => {
  try {
    const categories = await getCategory()
    await chargeCategoriesDb(categories)

    res.json({
      status: "api info loaded",
      data: categories,
    })
  } catch (err) {
    next(err)
  }
})

// RUTA PARA CREAR CATEGORÍAS
router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body
    const categories = await postCategory(name)

    res.json({
      status: "Category Created",
      data: categories,
    })
  } catch (err) {
    next(err)
  }
})

//RUTA PARA BORRAR CATEGORÍAS
router.delete("/", async (req, res, next) => {
  try {
    const { name } = req.body
    const categories = await deleteCategory(name)

    res.json({
      status: "Category Deleted",
      data: categories,
    })
  } catch (err) {
    next(err)
  }
})

// RUTA PARA ACTUALIZAR CATEGORÍAS
router.put("/", async (req, res, next) => {
  try {
    const { id, name } = req.body
    const categories = await updateCategory(id, name)

    res.json({
      status: "Category Updated",
      data: categories,
    })
  } catch (err) {
    next(err)
  }
})

//FILTRO POR CATEGORIAS Y PRECIO PARA EL HOME
router.get("/filter", async (req, res, next) => {
  const {categoryName, price} = req.query
  try {
    const result = await filterProducts(categoryName, price)

    result[0]
      ? res.json({ quantity: result.length, data: result })
      : res.status(404).send("No coincidences")
  } catch (error) {
    next(error)
  }
})

module.exports = router
