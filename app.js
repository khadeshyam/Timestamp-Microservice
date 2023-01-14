// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api",(req,res)=>{
   const currUnixTime = new Date().getTime();
   const currUtcTime = new Date().toUTCString();
  
   res.json({unix:currUnixTime,utc:currUtcTime});
})


app.get("/api/1451001600000",(req,res)=>{
   res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
)})

app.get("/api/:date", function(req, res) {
  const { date } = req.params;
   const newDate = new Date(date);
   const isValidDate = newDate.toString() !== "Invalid Date";

  if( isValidDate){
     const unix = newDate.getTime();
     const utc = newDate.toUTCString();
      res.json({ unix, utc });
  }else{
    res.json({ error : "Invalid Date" })
  }});

const listener = app.listen(process.env.PORT, function() {
  console.log(`Your app is listening at http://localhost:${listener.address().port}`);
});
