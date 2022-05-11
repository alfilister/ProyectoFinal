const { Router } = require("express")
const { getCategory, chargeCategoriesDb } = require("../controllers")

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

// router.post("/", async (req, res, next) => {
//   try {
//     const categories = await postCategory()

//     res.json({
//       status: "api info loaded",
//       data: categories,
//     })
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router
