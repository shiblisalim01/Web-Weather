const express=require("express");
const https=require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname +"/index.html");
});

app.post("/",function(req ,res){
  const query = req.body.cityname;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=83bd0aa7f5e8a8c0727ee6fbfac8eb8a&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData =JSON.parse(data)
      const temp=weatherData.main.temp;
      const weather=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";


      res.write("<h1>the temperature in "+query+" is "+temp+" degree celcius.</h1>");
      res.write("<img src="+imageurl+">");
      res.send();

    })
  });
})

app.listen(3000,function(){
  console.log("server is started");
})
