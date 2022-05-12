const { Router } = require("express")
const {
  getCategory,
  chargeCategoriesDb,
  postCategory,
  deleteCategory,
  updateCategory,
  filterByCategory,
} = require("../controllers")

const router = Router()

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

router.get("/filter/:categoryName", async (req, res, next) => {
  try {
    const result = await filterByCategory(req.params.categoryName)

    result[0]
      ? res.json({ quantity: result.length, data: result })
      : res.status(404).send("No coincidences")
  } catch (error) {
    next(error)
  }
})

module.exports = router
