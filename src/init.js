const models = require("./sequelize_models");

module.exports = async flag => {
  if (flag) {
    await models.sequelize.sync({ force: true });
  }
};
