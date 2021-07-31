const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");
const { adminCheck, authCheck } = require("../middlewares/auth");
const {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
} = require("../config/keys");

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

router.post("/uploadimages", authCheck, adminCheck, async (req, res) => {
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
});

router.post("/removeimage", authCheck, adminCheck, (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("ok");
  });
});

module.exports = router;
