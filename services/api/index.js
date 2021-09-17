const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');
const app = require('express')();

const config = require('./config')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const mongoUrl = config.mongoURI
/* connect to Mongo daemon */
mongoose.connect(mongoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error:"));
db.once("open", function () {
  console.log("DB Connection Successful!");
});

/* shema and model for mongodb access */
var schema = mongoose.Schema({
  value: String
});

var Model = mongoose.model("model", schema, "myCollection");

/* routes */
app.post('/save', (req, res) => {

  const valueList = req.body.value
  const valueArr = []
  
  for (let value of valueList) {
    const obj = { value: value }
    valueArr.push(obj)
  }

  Model.create(valueArr, function (err, result) {
    if(result){
      res.status(200).send(result)
    }else{
      res.status(500).send("server error",err)
    }
  });

})

app.get('/uploads', (req, res) => {
  res.sendFile('./public/uploads.json', { root: __dirname });
})


app.get('/fetchAll', (req, res) => {

  Model.find(function (err, result) {
    if(result){
      res.status(200).send(result)
    }else{
      res.status(500).send("server error",err)
    }
  });

})


app.get('/delete', (req, res) => {

  Model.collection.drop((err,result)=>{
    if(result){
      res.status(200).send("all records deleted")
    }
    else{
      res.status(200).send("no records to be deleted")
    }
  });

})


const port = 3000;
app.listen(port, () => console.log('Server running on port 3000'));