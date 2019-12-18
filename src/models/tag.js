const { isNil } = require("lodash");
const dataSyncHandler = require("../dataSyncHandler");

class Tag {
  constructor(sequelize, DataTypes) {
    this.orm = sequelize.define("Tag", {
      value: DataTypes.STRING
    });
  }

  associate(models) {
    this.orm.belongsToMany(models.MarketplaceItem.orm, { through: "ItemTag" });
  }

  async list(itemId) {
    return dataSyncHandler(async itemId => {
      const item = await MarketplaceItem.findOne({
        where: { id: itemId }
      });
      if (isNil(item)) {
        return null;
      } else {
        const tags = await item.getTags();
        return tags;
      }
    });
  }
}

module.exports = Tag;
