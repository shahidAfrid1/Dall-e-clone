const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const Post = require("../modals/post");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, image } = req.body;
    const imageUrl = await cloudinary.uploader.upload(image);

    const newPost = await Post.create({
      name,
      prompt,
      image: imageUrl.url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
});

module.exports = router;
