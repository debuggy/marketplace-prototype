const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const MarketplaceItem = require("./marketplace-item");
const Tag = require("./tag");

const SQL_CONNECTION_STR =
  "postgresql://postgres:123qwe@localhost:54321/openpai";
const sequelize = new Sequelize(SQL_CONNECTION_STR);

const models = {
  MarketplaceItem: MarketplaceItem(sequelize, DataTypes),
  Tag: Tag(sequelize, DataTypes)
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;

module.exports = models;
