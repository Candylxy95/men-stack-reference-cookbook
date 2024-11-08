const jwt = require("jsonwebtoken");

const isSignedIn = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ error: "missing authorization" });
  }
  const token = req.headers["authorization"].replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: "not authorised" });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "missing token" });
  }
};

module.exports = isSignedIn;
