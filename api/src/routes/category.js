const { Router } = require("express")
const {
  getCategory,
  chargeCategoriesDb,
  postCategory,
  deleteCategory,
  updateCategory,
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

module.exports = router
