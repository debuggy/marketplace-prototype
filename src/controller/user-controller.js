const { MarketplaceItem, User } = require("../sequelize_models");
const { isEmpty } = require("lodash");

const list = (req, res, next) => {
  console.log(req.params.username);
  User.findOne({ where: { name: req.params.username } })
    .then(user => {
      return user.getMarketplaceItems();
    })
    .then(items => {
      res.status(200).json(items);
    });
};

const get = (req, res, next) => {
  User.findOne({ where: { name: req.params.username } })
    .then(user => {
      return user.getMarketplaceItems({ where: { id: req.params.itemId } });
    })
    .then(items => {
      if (isEmpty(items)) {
        res.status(404).send("not found");
      } else {
        res.status(200).json(items[0]);
      }
    });
};

const update = (req, res, next) => {
  let user;
  User.findOne({ where: { name: req.params.username } })
    .then(result => {
      user = result;
      return user.getMarketplaceItems({ where: { id: req.params.itemId } });
    })
    .then(items => {
      if (isEmpty(items)) {
        MarketplaceItem.findOne({ where: { id: req.params.itemId } })
          .then(item => {
            return user.addMarketplaceItem(item);
          })
          .then(() => {
            res.status(200).send("ok");
          });
      } else {
        res.status(409).send("conflict");
      }
    });
};

const del = (req, res, next) => {
  let user;
  User.findOne({ where: { name: req.params.username } })
    .then(result => {
      user = result;
      return user.getMarketplaceItems({ where: { id: req.params.itemId } });
    })
    .then(items => {
      if (isEmpty(items)) {
        res.status(404).send("not found");
      } else {
        user.removeMarketplaceItems(items);
        res.status(200).send("ok");
      }
    });
};

// module exports
module.exports = {
  list,
  get,
  update,
  del
};
