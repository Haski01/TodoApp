// Schema Validation (using joi(npm-package) for Server side validation)

const joi = require("joi");

module.exports.todoValidateSchema = joi.object({
  todo: joi
    .object({
      task: joi.string().required(),
    })
    .required(),
});
