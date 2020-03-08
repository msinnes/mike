module.exports = (target, check) => !!target
  && !!check
  && !!target.Interface
  && !!check.Interface
  && target.Interface.extends(check.Interface);