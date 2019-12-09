const express = require("express");
const itemController = require("./controller/item-controller");
const tagController = require("./controller/tag-controller");
const userController = require("./controller/user-controller");

const router = new express.Router();

router
  .route("/marketplace/items")
  .get(itemController.list)
  .post(itemController.create);

router
  .route("/marketplace/items/:itemId")
  .get(itemController.get)
  .put(itemController.update)
  .delete(itemController.del);

router
  .route("/marketplace/items/:itemId/tags")
  .get(tagController.list)
  .put(tagController.update);

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
