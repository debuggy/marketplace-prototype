const { MarketplaceItem, Tag } = require("./sequelize_models");

const list = (req, res, next) => {
  MarketplaceItem.findOne({ where: { id: req.params.itemId } })
    .then(item => {
      console.log(Object.getOwnPropertyNames(item));
      const tags = item.getTags();
      return tags;
    })
    .then(tags => {
      res.status(200).send(
        tags.map(tag => {
          return tag.value;
        })
      );
    });
};

const update = (req, res, next) => {
  MarketplaceItem.findOne({ where: { id: req.params.itemId } })
    .then(item => {
      const tagList = req.body;
      return Promise.all(
        tagList.map(tag => {
          Tag.findOrCreate({ where: { value: tag } }).then(([tag, created]) => {
            item.addTag(tag);
          });
        })
      );
    })
    .then(result => res.status(200).send("updated"));
};

// module exports
module.exports = {
  list,
  update
};
