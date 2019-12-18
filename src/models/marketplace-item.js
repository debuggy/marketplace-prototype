const dataSyncHandler = require("../dataSyncHandler");

class MarketplaceItem {
  constructor(sequelize, DataTypes, models) {
    this.orm = sequelize.define("MarketplaceItem", {
      name: DataTypes.STRING,
      author: DataTypes.STRING,
      category: DataTypes.ARRAY(DataTypes.STRING), // eslint-disable-line new-cap
      introduction: DataTypes.STRING,
      description: DataTypes.TEXT,
      jobConfig: DataTypes.JSON,
      submits: DataTypes.INTEGER
    });
  }

  associate(models) {
    this.orm.belongsToMany(models.Tag.orm, { through: "ItemTag" });
    this.orm.belongsToMany(models.User.orm, {
      through: "StarRelation"
    });
  }

  async list(name, author, category) {
    const filterStatement = {};
    if (name) {
      filterStatement.name = name;
    }
    if (author) {
      filterStatement.author = author;
    }
    if (category) {
      filterStatement.category = category;
    }
    return await this.orm.findAll({ where: filterStatement });
    // const handler = dataSyncHandler(async (name, author, category) => {
    //   const filterStatement = {};
    //   if (name) {
    //     filterStatement.name = name;
    //   }
    //   if (author) {
    //     filterStatement.author = author;
    //   }
    //   if (category) {
    //     filterStatement.category = category;
    //   }
    //   return await this.orm.findAll({ where: filterStatement });
    // });

    // return await handler(name, author, category);
  }
}

module.exports = MarketplaceItem;
