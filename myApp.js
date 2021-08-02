var express = require("express");
var app = express();

//console.log("Hello World");

// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

const absolutePath = __dirname + "/views/index.html";
const publicPath = __dirname + "/public/";

app.use("/public", express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    return res.json({ message: " HELLO JSON" });
  } else {
    return res.json({ message: "Hello json" });
  }
});

module.exports = app;
