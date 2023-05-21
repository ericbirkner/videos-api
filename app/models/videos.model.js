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
    }         
  },
  {
    timestamps: true,
  });

  return Video;
};