const { Router } = require("express");
const controller = require("../controllers/addresses.controller");

const router = Router();

router.get("/", controller.getAddresses);

module.exports = router;
