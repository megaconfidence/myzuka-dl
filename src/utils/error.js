class CustomError extends Error {
  constructor(code = '', ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = 'CustomError';
    this.code = code;
    this.date = new Date();
  }
}

export default CustomError;
