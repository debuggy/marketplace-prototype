module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    name: DataTypes.STRING
  });

  User.associate = models => {
    models.User.belongsToMany(models.MarketplaceItem, { through: "StarRelation" });
  };

  return User;
};
