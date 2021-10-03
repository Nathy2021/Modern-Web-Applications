const express = require("express");
const badmintonFunsController = require("../controller/bandmintoFuns-controller");
const router = express.Router();

router.route("/badmintonfuns")
    .get(badmintonFunsController.funsGetAll)
    .post(badmintonFunsController.funAdd);
router.route("/badmintonfuns/:funId")
    .get(badmintonFunsController.funsGetOne)
    .put(badmintonFunsController.updateFun)
    .delete(badmintonFunsController.deletedFun);

module.exports = router;