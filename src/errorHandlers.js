export const badRequestErrorHandler = (err, req, res, next) => {
  if (err.status === 400) {
    console.log(`Error in Handlers 400: ${err}`);
    res
      .status(err.status)
      .send({ message: err.message || "Bad request", errors: err.errors });
  } else next(err);
};
export const forbiddenErrorHandler = (err, req, res, next) => {
  if (err.status === 403) {
    console.log(`Error in Handlers 403: ${err}`);
    res.status(403).send("Forbidden!");
  } else next(err);
};
export const notFoundErrorHandler = (err, req, res, next) => {
  if (err.status === 404) {
    console.log(`Error in Handlers 404: ${err}`);
    res.status(err.status).send(err.message);
  } else {
    next(err);
  }
};
export const catchAllErrorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message || `500 Server error`);
};
