const { Router } = require("express");
const controller = require("../controllers/doctor.controller");

const router = Router();

router.get("/", controller.getDoctors);

module.exports = router;
