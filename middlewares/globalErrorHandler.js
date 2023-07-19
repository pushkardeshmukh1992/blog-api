const globalErrHandler = (err, req, res, next) => {
  console.log("in middleware");
  console.log(err);

  const status = err?.status ? err?.status : "failed";

  const message = err?.message;

  const stack = err?.stack;

  res.status(500).json({
    status,
    message,
    stack,
  });
};

const notFound = (req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on the server`);
  next(err);
};

module.exports = { notFound, globalErrHandler };
