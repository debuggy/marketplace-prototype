const models = require("./models");
const { User, MarketplaceItem } = require("./models");

let SYNC_FLAG = false;

const init = async () => {
  if (!SYNC_FLAG) {
    await models.sequelize.sync();
    await User.create({ name: "mintao" });
    await User.create({ name: "debuggy" });
    await User.create({ name: "test" });
    SYNC_FLAG = true;
  }
};

module.exports = { init, SYNC_FLAG };
