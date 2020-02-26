const Validation = require('@core/validations/Validation');

const regex = /^[A-Za-z]+$/;

module.exports = Validation(
  value => regex.test(value),
  'Syntax Node names must be all characters'
);
