// Handling Async Errors Using "wrapAsync" (as better than try-catch)
let wrapAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = wrapAsync;
