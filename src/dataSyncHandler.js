const { get } = require("lodash");
const models = require("./models");

const init = async () => {
  await models.sequelize.sync();
  await models.User.orm.create({ name: "mintao" });
  await models.User.orm.create({ name: "debuggy" });
  await models.User.orm.create({ name: "test" });
};

const dataSyncHandler = fn => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      if (get(error, "original.code") === "42P01") {
        // Error 42P01: relation does not exist
        try {
          await init();
          return await fn(args);
        } catch (error) {
          throw error;
        }
      } else {
        throw error;
      }
    }
  };
};

// module exports
module.exports = dataSyncHandler;
