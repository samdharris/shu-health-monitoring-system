const { Router } = require("express");
const controller = require("../controllers/user.controller");
const dataController = require("../controllers/data.controller");
const router = Router();

router.get("/", controller.index);
router.get("/:userId", controller.getUser);
router.get("/:userId/integrations", dataController.viewData);
router.post("/", controller.addUser);

module.exports = router;
