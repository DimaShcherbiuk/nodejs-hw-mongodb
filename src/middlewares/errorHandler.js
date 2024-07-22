export function errorHandler(err, req, res, next) {
  const { status = 500 } = err;
  res.status(status).json({
    message: 'Something went wrong',
  });
}
