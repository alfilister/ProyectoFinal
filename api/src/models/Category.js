const { Router } = require("express");
const categoryController = require("../controllers/category");

const router = Router();

// RUTA PARA CARGAR Y OBTENER LAS CATEGORÍAS
router.get("/", async (req, res, next) => {
	try {
		const categories = await categoryController.getCategories();

		res.json({
			status: "Api info loaded",
			results: categories,
		});
	} catch (err) {
		next(err);
	}
});

// RUTA PARA CREAR CATEGORÍAS
router.post("/", async (req, res, next) => {
	try {
		const { nameCategory } = req.body;

		const categories = await categoryController.postCategory(nameCategory);

		res.json({
			status: "Category created",
			results: categories,
		});
	} catch (err) {
		next(err);
	}
});

//RUTA PARA BORRAR CATEGORÍAS
router.delete("/", async (req, res, next) => {
	try {
		const { idCategory } = req.body;

		const categories = await categoryController.deleteCategory(idCategory);

		res.json({
			status: "Category deleted",
			results: categories,
		});
	} catch (err) {
		next(err);
	}
});

// RUTA PARA ACTUALIZAR CATEGORÍAS
router.put("/", async (req, res, next) => {
	console.log(req.body);
	try {
		const { id, name } = req.body;
		const categories = await categoryController.updateCategory(id, name);

		res.json({
			status: "Category updated",
			results: categories,
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
