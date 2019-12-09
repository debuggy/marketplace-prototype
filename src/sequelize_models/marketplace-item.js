module.exports = (sequelize, DataTypes) => {
  const MarketplaceItem = sequelize.define("MarketplaceItem", {
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    category: DataTypes.ARRAY(DataTypes.STRING), // eslint-disable-line new-cap
    introduction: DataTypes.STRING,
    description: DataTypes.TEXT,
    jobConfig: DataTypes.JSON,
    submits: DataTypes.INTEGER,
    starNumber: DataTypes.INTEGER,
    starUsers: DataTypes.ARRAY(DataTypes.STRING) // eslint-disable-line new-cap
  });

  MarketplaceItem.associate = models => {
    models.MarketplaceItem.belongsToMany(models.Tag, { through: "ItemTag" });
  };

  return MarketplaceItem;
};
