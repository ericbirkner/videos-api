const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const app = express();

app.use(cors());
console.log('its localhost')

app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));   

const db = require("./app/models");

//descomentar cuando funcione el sql
  db.sequelize.sync()
  .then(function(){
    console.log('DB connection sucessful.');
  }, function(err){
    // catch error here
    console.error(err);
  });



app.get("/", (req, res) => {
  res.json({ message: "Api No molestar" });
});

require("./app/routes/routes")(app);

// set port, listen for requests
const PORT = 80;
app.listen(PORT, () => {
  console.error(`Server is running on port ${PORT}.`);
});

module.exports = app;