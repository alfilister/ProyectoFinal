const { Router } = require("express");
const userController = require("../controllers/user");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    res.json({
      status: "Users loaded",
      results: await userController.getUser(),
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:idUser", async (req, res, next) => {
  const { idUser } = req.body;
  try {
    res.json({
      status: "Users loaded",
      results: await userController.getUserById(idUser),
    });
  } catch (err) {
    next(err);
  }
});

router.put("/editarUser", async (req, res, next) => {

	try {
		const updated = await userController.updateUser (req.body);
		res.json({ results: updated });
	} catch (error) {
		next(error);
	}
});

router.delete("/:idUser", async (req, res, next) => {
	const { idUser } = req.params;
	try {
		const result = await userController.deleteUser(idUser);
		res.send({ results: result });
	} catch (error) {
		next(error);
	}
});

router.post("/created", async (req, res, next) => {

  try {
    const userCreate = await userController.postUser(req.body) ;
    res.json({
      status: "Users created",
      results: userCreate,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
