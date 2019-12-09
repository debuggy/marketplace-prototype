const models = require("./sequelize_models");
const { User, MarketplaceItem } = require("./sequelize_models");

module.exports = async flag => {
  if (flag) {
    await models.sequelize.sync({ force: true });
    User.create({ name: "mintao" });
    User.create({ name: "debuggy" });
    User.create({ name: "test" });
  }
};
