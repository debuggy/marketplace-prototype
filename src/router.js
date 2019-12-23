const express = require("express");
const itemController = require("./controllers/item-controller");
const userController = require("./controllers/user-controller");
const param = require('./middlewares/parameter');
const marketItemInputSchema = require('./config/marketItem');

const router = new express.Router();

router
  .route("/marketplace/items")
  .get(itemController.list)
  .post(param.validate(marketItemInputSchema.marketItemCreateInputSchema), itemController.create);

router
  .route("/marketplace/items/:itemId")
  .get(itemController.get)
  .put(param.validate(marketItemInputSchema.marketItemUpdateInputSchema), itemController.update)
  .delete(itemController.del);

router
  .route("/marketplace/items/:itemId/starUsers")
  .get(itemController.listStarUsers);

router.route("/user/:username/starItems").get(userController.list);

router
  .route("/user/:username/starItems/:itemId")
  .get(userController.get)
  .put(userController.update)
  .delete(userController.del);

// module exports
module.exports = router;
