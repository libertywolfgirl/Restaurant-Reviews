const express = require("express");
const RestaurantsCtrl = require('./restaurants.controller.js')

const router = express.Router();

router.route("/").get(RestaurantsCtrl.apiGetRestaurants);

module.exports = router;
