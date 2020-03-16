const { Router } = require("express");
const controller = require("../controllers/patient.controller");

const router = Router();

router.get("/:userId", controller.getPatients);

module.exports = router;
