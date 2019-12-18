const { MarketplaceItem, User } = require("../models");
const { isEmpty } = require("lodash");
const asyncHandler = require("../asyncHandler");

const list = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ where: { name: req.params.username } });
  const items = await user.getMarketplaceItems();
  res.status(200).json(items);
});

const get = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ where: { name: req.params.username } });
  const items = await user.getMarketplaceItems({
    where: { id: req.params.itemId }
  });
  if (isEmpty(items)) {
    res.status(404).send("not found");
  } else {
    res.status(200).json(items[0]);
  }
});

const update = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ where: { name: req.params.username } });
  const items = await user.getMarketplaceItems({
    where: { id: req.params.itemId }
  });
  if (isEmpty(items)) {
    const item = await MarketplaceItem.findOne({
      where: { id: req.params.itemId }
    });
    await user.addMarketplaceItem(item);
    res.status(200).send("ok");
  } else {
    res.status(409).send("conflict");
  }
});

const del = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ where: { name: req.params.username } });
  const items = await user.getMarketplaceItems({
    where: { id: req.params.itemId }
  });
  if (isEmpty(items)) {
    res.status(404).send("not found");
  } else {
    await user.removeMarketplaceItems(items);
    res.status(200).send("ok");
  }
});

// module exports
module.exports = {
  list,
  get,
  update,
  del
};
