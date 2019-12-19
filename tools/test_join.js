const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const SQL_CONNECTION_STR =
  "postgresql://postgres:123qwe@localhost:54321/openpai";
const TAG_NAME = `tag_${Date.now().toString(16)}`;
const ITEM_NAME = `item_${Date.now().toString(16)}`;

async function main() {
  const sequelize = new Sequelize(SQL_CONNECTION_STR);

  const Item = sequelize.define("item", {
    name: DataTypes.STRING,
    author: DataTypes.STRING
  });

  const Tag = sequelize.define("tag", {
    value: DataTypes.STRING
  });

  Item.belongsToMany(Tag, { through: "ItemTag" });
  Tag.belongsToMany(Item, { through: "ItemTag" });
  await sequelize.sync({ force: true });

  const item1 = await Item.create({ name: "item1", author: "jack" });
  const item2 = await Item.create({ name: "item2", author: "jack" });
  const tag1 = await Tag.create({ name: "tag1" });
  const tag2 = await Tag.create({ name: "tag2" });
  await item1.addTags([tag1, tag2]);
  await item2.addTags([tag1]);
  const result1 = await item1.getTags();
  const result = await tag1.getItems();
  console.log(result1);
}

main()
  .then(() => {
    console.log("complete");
  })
  .catch(e => console.log(e));
