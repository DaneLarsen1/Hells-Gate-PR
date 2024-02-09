const router = require("express").Router();

const apiRoutes = require("./api");
const frontEndRoutes = require("./frontEndRoutes.js"); //* added .js to file path

router.use("/", frontEndRoutes);
router.use("/api", apiRoutes);

// router.use((req, res) => {
//    res.status(404).end();
// });

module.exports = router;
