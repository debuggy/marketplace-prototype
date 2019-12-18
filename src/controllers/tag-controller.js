const { isNil } = require("lodash");
const { MarketplaceItem, Tag } = require("../models");
const asyncHandler = require("../asyncHandler");

const list = asyncHandler(async (req, res, next) => {
  const item = await MarketplaceItem.findOne({
    where: { id: req.params.itemId }
  });
  if (isNil(item)) {
    res.status(404).send("Item not found");
  } else {
    const tags = await item.getTags();
    res.status(200).send(
      tags.map(tag => {
        return tag.value;
      })
    );
  }
});

const update = asyncHandler(async (req, res, next) => {
  const item = await MarketplaceItem.findOne({
    where: { id: req.params.itemId }
  });
  if (isNil(item)) {
    res.status(404).send("Item not found");
  } else {
    const tagList = req.body;
    await item.setTags([]);
    tagList.map(async tag => {
      const [newTag, created] = await Tag.findOrCreate({
        where: { value: tag }
      });
      await item.addTag(newTag);
    });
    res.status(200).send("updated");
  }
});

// module exports
module.exports = {
  list,
  update
};
