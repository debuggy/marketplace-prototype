const express = require("express");
const itemController = require("./item-controller");
const tagController = require("./tag-controller");

const router = new express.Router();

router
  .route("/items")
  .get(itemController.list)
  .post(itemController.create);

router
  .route("/items/:itemId")
  .get(itemController.get)
  .put(itemController.update)
  .delete(itemController.del);

router
  .route("/items/:itemId/tags")
  .get(tagController.list)
  .put(tagController.update);

// module exports
module.exports = router;
