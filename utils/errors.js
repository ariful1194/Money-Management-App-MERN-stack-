module.exports = {
  resourceError: (res, errors, msg) => {
    errors = msg;
    return res.status(400).json(errors);
  }
};
