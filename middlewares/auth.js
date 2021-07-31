const admin = require("../firebase/index");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = firebaseUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ err: "Invalid or expired Token" });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({ err: "Admin Resouce.Access Denied" });
  } else {
    next();
  }
};
