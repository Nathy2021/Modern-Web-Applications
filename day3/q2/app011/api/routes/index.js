const express = require("express");
const controllerProduct= require("../controller/product.controller");
const router = express.Router();

router.route("/:number1").get(controllerProduct.product);

module.exports = router;