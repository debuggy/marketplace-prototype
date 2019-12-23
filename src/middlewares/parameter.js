// module dependencies
const Joi = require('joi');
const createError = require('../utils/error');

/**
 * Validate parameters.
 */
const validate = (schema) => {
  return (req, res, next) => {
    Joi.validate(req.body, schema, (err, value) => {
      if (err) {
        next(createError('Bad Request', 'InvalidParametersError', err.message));
      } else {
        req.originalBody = req.body;
        req.body = value;
        next();
      }
    });
  };
};

// module exports
module.exports = {validate};