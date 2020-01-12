const express = require("express");
const router = express.Router();
const Url = require("../models/Url");
const { shortenUrl, shortenWithCustomUrl } = require("../service/UrlService");

router.post("/shorten", async (req, res) => {
  let { longUrl, customUrl } = req.body;
  let { flag, value } = customUrl;
  let result;

  if (flag) {
    result = shortenWithCustomUrl(longUrl, value);
  } else {
    result = shortenUrl(longUrl);
  }

  let { status, url, errorMessage } = await result;

  if (status != undefined && status != 200) {
    return res.status(status).json(errorMessage);
  }
  res.json(url);
});

router.post("/statistics", async (req, res) => {
  let { shortUrl } = req.body;

  let url = await Url.findOne({ shortUrl });

  res.status(200).json(url.hitCount);
});

module.exports = router;
