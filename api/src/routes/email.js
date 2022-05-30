const { Router } = require("express");
const emailController = require("../controllers/email");

const router = Router();

router.post("/sendEmail", async (req, res, next) => {
  try {
    const emailSend = await emailController.sendEmail(req.body);
    res.json({
      status: "the email was send ",
      results: emailSend,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
