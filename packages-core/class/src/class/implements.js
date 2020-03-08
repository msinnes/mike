module.exports = (target, check) => !!target.Class
  && !!check.Interface
  && target.Class.implements(check);
