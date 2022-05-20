const { Router } = require("express");
const userController = require("../controllers/user");
const { User } = require("../db");

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
  const { idUser } = req.params;
  try {
    res.json({
      status: "Users loaded",
      results: await userController.getUserById(idUser),
    });
  } catch (err) {
    next(err);
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
