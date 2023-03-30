function locals(req, res, next) {
  res.locals = {
    ...res.locals,
    copyrightYear: new Date().getFullYear(),
  };

  next();
}

module.exports = locals;
