module.exports = (sequelize, Sequelize) => {
  const Video = sequelize.define("videos", {
    vid	: {
      type: Sequelize.STRING
    },
    title	: {
      type: Sequelize.STRING
    },
    description	: {
      type: Sequelize.TEXT
    },
    duration	: {
      type: Sequelize.STRING
    },
    image : {
      type: Sequelize.STRING
    },
    source : {
      type: Sequelize.STRING
    },    
  },
  {
    timestamps: true,
  });

  return Video;
};