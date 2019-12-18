const { isNil } = require("lodash");
const dataSyncHandler = require("../dataSyncHandler");

class User {
  constructor(sequelize, DataTypes) {
    this.orm = sequelize.define("User", {
      name: DataTypes.STRING
    });
  }

  associate(models) {
    this.orm.belongsToMany(models.MarketplaceItem.orm, {
      through: "StarRelation"
    });
  }

  async list(username) {
    return dataSyncHandler(async username => {
      const user = await User.findOne({ where: { name: username } });
      if (isNil(user)) {
        return null;
      } else {
        return user.getMarketplaceItems();
      }
    });
  }
}

module.exports = User;
