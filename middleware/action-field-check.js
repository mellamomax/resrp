const isEmpty = function (obj) {
    return Object.keys(obj).length === 0;
};

const isObjKeyUndefined = function (obj, key) {
  return typeof obj[key] === "undefined";
}
/*
 * @description - Checks if the triggerFields is set correctly in the request and if it has a values
 */
module.exports = function (req, res, next) {

  // If it's empty or doesn't exist return 400
  if (typeof req.body.actionFields === "undefined" || isEmpty(req.body.actionFields)) {

    res.status(400).send({
      "errors": [{
        "message": "actionFields doesn't exist or is empty"
      }]
    });

  } else {

    if (isObjKeyUndefined(req.body.actionFields, "device")) {

      res.status(400).send({
        "errors": [{
          "message": "actionFields doesn't exist or is empty"
        }]
      });
      
    } else {
      next();
    }

  }

};
