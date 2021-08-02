var express = require("express");
var app = express();
var bodyParser = require("body-parser");

const mySecret = process.env['MESSAGE_STYLE']

//console.log("Hello World");

// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

const absolutePath = __dirname + "/views/index.html";
const publicPath = __dirname + "/public/";

app.use("/public", express.static(publicPath));

app.use(bodyParser.urlencoded({extend: true}))

app.use((req,res,next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})

app.get("/", (req, res) => {
  res.sendFile(absolutePath);
});

app.get("/:word/echo", (req, res) => {
  res.json({echo:req.params.word});
});

app.get("/name", (req, res) => {
  res.json({name:`${req.query.first} ${req.query.last}`});
});

app.post("/name", (req, res) => {
  res.json({name:`${req.body.first} ${req.body.last}`});
});

app.get("/now/", (req, res, next) => {

  req.time = Date().toString();
  next();

},(req,res) => {

  res.json({time: req.time});

});

app.get("/json", (req, res) => {
  
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

//Timestamp Microservice
app.get("/api",(req,res,next) => {
  
  req.time =  new Date();
  
  next();

}, (req,res) => {

  res.json({unix: req.time.getTime(), utc: req.time.toUTCString()});

})

app.get("/api/:date",(req,res,next) => {
  
  const argument = /\d{13}/.test(req.params.date) ? parseInt(req.params.date) : req.params.date 
  
  try{
    req.time =  new Date(argument)

    if(req.time instanceof Date && !isNaN(req.time.valueOf())){
      next();
    } else {
      throw Error()
    }

  }catch(e){
    
    res.send({error : "Invalid Date"})

  }

}, (req,res) => {

  res.json({unix: req.time.getTime(), utc: req.time.toUTCString()});

})


module.exports = app;
