const { init } = require("./init");
const { get } = require("lodash");

const asyncHandler = middleware => {
  return (req, res, next) => {
    Promise.resolve(middleware(req, res, next)).catch(error => {
      if (get(error, "original.code") === "42P01") {
        // Error 42P01: relation does not exist
        init()
          .then(() => {
            res.status(404).send("Not initializing");
          })
          .catch(next);
      } else {
        next();
      }
    });
  };
};

// module exports
module.exports = asyncHandler;
