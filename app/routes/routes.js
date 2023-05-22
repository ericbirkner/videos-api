module.exports = app => {
  const videos = require("../controllers/video.controller");
  const config = require('../config/config');
  const express = require("express");
  
  var router = require("express").Router();
  
  //videos
  router.get("/videos", videos.findAll);
  router.get("/videos/youtube/:vid", videos.getYoutubeId);

  router.get("/videos/:vid", videos.findVid);

  router.delete("/videos/:id", videos.delete);
  router.post("/videos", videos.create);
  
  app.use('/api', router);
};
