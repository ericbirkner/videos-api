const dotenv = require('dotenv');
dotenv.config();
const { sequelize, videos } = require("../models");
const db = require("../models");
const Video = db.videos;
const Op = db.Sequelize.Op;
const axios = require('axios')


exports.getYoutubeId = async (req, res) => {
  if(!req.params.vid) {
    res.status(400).send({
      status: "error",
      code: 400,
      message: 'Bad request here, missing params.'
    });
    return;
  }

  try {
    const vid = req.params.vid;
    const resp = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${vid}&key=AIzaSyAwuNRV-TO7-6B-gZKUUECVoO1JFq85l9c&part=snippet`);
    console.log(resp.data);
    res.send(resp.data.items[0]);
  } catch (err) {
    // Handle Error Here
    console.error(err);
    res.status(500).send({
      status: "error",
      code: 500,
      message: 'Error requesting youtube id.'
    });
  }
};


// Create and Save a new Video
exports.create = async (req, res) => {
  
  // Validate request
  if(!req.body.vid) {
    res.status(400).send({
      status: "error",
      code: 400,
      message: 'Bad request here, missing params.'
    });
    return;
  }
  
  let vid = req.body.vid;
  
  try {
    const resp = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${vid}&key=AIzaSyAwuNRV-TO7-6B-gZKUUECVoO1JFq85l9c&part=snippet`);
    console.log(resp.data.items[0]);
    const datos = {
      vid : vid,
      title : resp.data.items[0].snippet.title,
      description : resp.data.items[0].snippet.description,
    };

  //console.log("Data to save: ", datos);

  // Save Video in the database
  Video.create(datos)
    .then(async data => {
      data.code=200;
      data.status='OK';
      data.message ='OK'
      res.send(data);
    })
    .catch(async err => {
      console.error("datos no guardados",datos);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Video."
      });
    });
  } catch (err) {
    // Handle Error Here
    console.error(err);
    res.status(500).send({
      status: "error",
      code: 500,
      message: 'Error requesting youtube id.'
    });
  }
};


// Retrieve all videos from the database.
exports.findAll = (req, res) => {
  
  Video.findAll({ where: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving videos."
      });
    });
};

// Update a Video by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Video.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Video was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Video with id=${id}. Maybe Video was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Video with id=" + id
      });
    });
};

// Delete a Video with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Video.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Video was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Video with id=${id}. Maybe Video was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Video with id=" + id
      });
    });
};