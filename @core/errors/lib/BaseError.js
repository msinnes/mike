const extend = (ChildError, SuperError) => {
  function ComposedError(message) {
    SuperError.call(this, message);
    ChildError.call(this, message);
  }

  ComposedError.prototype = Object.create(SuperError.prototype);
  ComposedError.extend = NextChildError => extend(NextChildError, ComposedError);
  ComposedError.prototype.constructor = ChildError.prototype.constructor;

  return ComposedError;
};

function BaseError(message) {
  this.name = this.constructor.name;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  }

  Object.defineProperty(this, 'message', {
    get: () => `${this.name}: ${message}`,
  });
}

module.exports = extend(BaseError, Error);
