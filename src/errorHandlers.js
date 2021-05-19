export const notFoundHandler = (err, req, res, next) => {
  //   err.status === 404
  //     ? res.status(err.status).send(err.message || "404 Not Found!")
  //     : next(err);

  if (err.status === 404) {
    res.status(err.status).send(err.message || "404 Not Found!");
  } else {
    next(err);
  }
};
// export const catchAll = (err, req, res, next) => {};
// export const catchAll = (err, req, res, next) => {};
export const catchAll = (err, req, res, next) => {
  res.status(500).send(`Server error`);
};
