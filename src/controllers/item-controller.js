const { Op } = require("sequelize");
const { isNil } = require("lodash");
const { MarketplaceItem, Tag } = require("../models");
const { init } = require("../init.js");
const asyncHandler = require("../asyncHandler");

const list = asyncHandler(async (req, res, next) => {
  const result = await MarketplaceItem.list(
    req.query.name,
    req.query.author,
    req.query.category
  );
  res.status(200).json(result);
});

const create = asyncHandler(async (req, res, next) => {
  await MarketplaceItem.create(req.body);
  res.status(201).send("Created");
});

const get = asyncHandler(async (req, res, next) => {
  const result = await MarketplaceItem.findOne({
    where: { id: req.params.itemId }
  });
  res.status(200).json(result);
});

const update = asyncHandler(async (req, res, next) => {
  const item = await MarketplaceItem.findOne({
    where: { id: req.params.itemId }
  });
  await item.update(req.body);
  res.status(200).send("updated");
});

const del = asyncHandler(async (req, res, next) => {
  const item = await MarketplaceItem.findOne({
    where: { id: req.params.itemId }
  });
  await item.destroy();
  res.status(200).send("deleted");
});

const listStarUsers = asyncHandler(async (req, res, next) => {
  const item = await MarketplaceItem.findOne({
    where: { id: req.params.itemId }
  });
  if (isNil(item)) {
    res.status(404).send("Item not found");
  } else {
    const users = await item.getUsers();
    res.status(200).json(users.map(user => user.name));
  }
});

// module exports
module.exports = {
  list,
  create,
  get,
  update,
  del,
  listStarUsers
};
