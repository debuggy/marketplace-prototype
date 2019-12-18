module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define("Tag", {
    value: DataTypes.STRING
  });

  Tag.associate = models => {
    models.Tag.belongsToMany(models.MarketplaceItem, { through: "ItemTag" });
  };

  return Tag;
};
