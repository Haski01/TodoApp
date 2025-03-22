// wrapAsync (optimzation way of try-catch method)

// passing as middleware
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
