const { Router } = require("express");

const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const patientRoutes = require("./patient.routes");
const appointmentRoutes = require("./appointment.routes");
const integrationRoutes = require("./integration.routes");
const router = Router();
const dummyRoutes = require("./dummy.routes");

router.use("/api/users", userRoutes);
router.use("/api/patients", patientRoutes);
router.use("/api/appointments", appointmentRoutes);
router.use("/api/integrations", integrationRoutes);
router.use(dummyRoutes);

router.use(authRoutes);

module.exports = router;
