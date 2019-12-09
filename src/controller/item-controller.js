const { Op } = require("sequelize");
const { MarketplaceItem, Tag } = require("../sequelize_models");

const list = (req, res, next) => {
  const includeStatement = {};
  const filterStatement = {};
  if (req.query.name) {
    filterStatement.name = req.query.name;
  }
  if (req.query.author) {
    filterStatement.author = req.query.author;
  }

  if (req.query.tags) {
    MarketplaceItem.findAll({
      where: filterStatement,
      include: [
        {
          model: Tag,
          where: { value: { [Op.in]: [].concat(req.query.tags) } } //format an array if only one tag query
        }
      ]
    }).then(items => {
      const result = items.map(item => {
        const { Tags, ...rest } = item.toJSON();
        console.log(rest);
        return rest;
      });
      console.log(result);
      res.status(200).json(result);
    });
  } else {
    MarketplaceItem.findAll().then(result => {
      res.status(200).json(result);
    });
  }
};

const create = (req, res, next) => {
  MarketplaceItem.create(req.body).then(item => {
    res.status(201).send("Created");
  });
};

const get = (req, res, next) => {
  MarketplaceItem.findOne({ where: { id: req.params.itemId } }).then(result => {
    res.status(200).json(result);
  });
};

const update = (req, res, next) => {
  MarketplaceItem.findOne({ where: { id: req.params.itemId } })
    .then(item => {
      const updatedItem = item.update(req.body);
      return updatedItem;
    })
    .then(result => res.status(200).send("updated"));
};

const del = (req, res, next) => {
  MarketplaceItem.findOne({ where: { id: req.params.itemId } })
    .then(item => {
      item.removeTags();
      return item;
    })
    .then(item => {
      item.destory();
    })
    .then(() => {
      res.status(200).send("deleted");
    });
};

const listStarUsers = (req, res, next) => {
  MarketplaceItem.findOne({ where: { id: req.params.itemId } })
    .then(item => {
      return item.getUsers();
    })
    .then(result => {
      res.status(200).json(result.map(user => user.name));
    });
};

// module exports
module.exports = {
  list,
  create,
  get,
  update,
  del,
  listStarUsers
};
