module.exports = (target, check) => !!target.Class 
  && !!check.Class
  && target.Class.extends(check.Class);
  