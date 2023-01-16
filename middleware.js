const IFTTT_SERVICE_KEY = process.env.IFTTT_SERVICE_KEY;

module.exports = {
  serviceKeyCheck: function (req, res, next) {
    const key = req.get("IFTTT-Service-Key");

    if (key !== IFTTT_SERVICE_KEY) {
      return res.status(401).send({
        "errors": [{
          "message": "Channel/Service key is not correct"
        }]
      });
    }

    next();
  },
};