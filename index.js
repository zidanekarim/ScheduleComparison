
const dotenv = require("dotenv")
dotenv.config()
const dbURI = process.env.MONGODB_URI;
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { OAuth2Client } = require("google-auth-library");
//const fs = require('fs');
//const jsonData = require('./public/client.json');


console.log("step1")
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connected");
    }
});
console.log("step2")
mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
})
console.log("step3")

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res)  {
    res.sendFile(__dirname + "/public/index.html");
});

const scheduleSchema = new mongoose.Schema({
    name: String,
    email: String,
    // do this for all 10 periods
    Period1: {
        courseCode1: String,
        section1: String,
        room1: String,
    },
    Period2: {
        courseCode2: String,
        section2: String,
        room2: String,
    },
    Period3: {
        courseCode3: String,
        section3: String,
        room3: String,
    },
    Period4: {
        courseCode4: String,
        section4: String,
        room4: String,
    },
    Period5: {
        courseCode5: String,
        section5: String,
        room5: String,
    },
    Period6: {
        courseCode6: String,
        section6: String,
        room6: String,
    },
    Period7: {
        courseCode7: String,
        section7: String,
        room7: String,
    },
    Period8: {
        courseCode8: String,
        section8: String,
        room8: String,
    },
    Period9: {
        courseCode9: String,
        section9: String,
        room9: String,
    },
    Period10: {
        courseCode10: String,
        section10: String,
        room10: String,
    },
});
    
const Schedule = mongoose.model("Schedule", scheduleSchema);
app.use(bodyParser.json());


app.post("/comparison", async (req, res) => {
    //console.log(Schedule);
    var schedules = await Schedule.find({email : req.body["email"]});
    if (schedules.length == 0) {
        res.status(404).json({status: 404});
        return;
    }

    var Period1 = "";
    var Period2 = "";
    var Period3 = "";
    var Period4 = "";
    var Period5 = "";
    var Period6 = "";
    var Period7 = "";
    var Period8 = "";
    var Period9 = "";
    var Period10 = "";
    var s1;
    var s2;
    var s3;
    var s4;
    var s5;
    var s6;
    var s7;
    var s8;
    var s9;
    var s10;
    
    

        var Period1 = schedules[0]["Period1"];
        var Period2 = schedules[0]["Period2"];
        var Period3 = schedules[0]["Period3"];
        var Period4 = schedules[0]["Period4"];
        var Period5 = schedules[0]["Period5"];
        var Period6 = schedules[0]["Period6"];
        var Period7 = schedules[0]["Period7"];
        var Period8 = schedules[0]["Period8"];
        var Period9 = schedules[0]["Period9"];
        var Period10 = schedules[0]["Period10"];


        
        
        // find all people with the same Period1
        s1 = await Schedule.find({Period1 : Period1});
        s2 = await Schedule.find({Period2 : Period2});
        s3 = await Schedule.find({Period3 : Period3});
        s4 = await Schedule.find({Period4 : Period4});
        s5 = await Schedule.find({Period5 : Period5});
        s6 = await Schedule.find({Period6 : Period6});
        s7 = await Schedule.find({Period7 : Period7});
        s8 = await Schedule.find({Period8 : Period8});
        s9 = await Schedule.find({Period9 : Period9});
        s10 = await Schedule.find({Period10 : Period10});
        const allSchedules = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10];
        res.status(200).json({allSchedules});
      

    });
    

   


// get the web client id from client.json


    




app.post("/auth", async (req, res) => {

  //console.log("got here!0")
  //console.log(req.body);
  try {

    // get the web client id from client.json
    const webID = "388312483979-0f6hup9b4bn8pg1hc98rum4dcsov3qh2.apps.googleusercontent.com"
    const client = new OAuth2Client(webID);
    const ticket = await client.verifyIdToken({ 
      idToken: req.body.id_token,
      audience: webID,
    });
    const payload = ticket.getPayload();
    const stuy = payload['hd'];
    const email = payload['email'];
    const userid = payload['sub'];
    console.log(`User authenticated with id: ${userid}`);

    const allInfo = {
        stuy: stuy,
        email: email,
    }

    res.status(200).json({allInfo});
  } catch (err) {
    
    console.log("Invalid ID Token");
    console.log(err);
  }
});




app.post('/sendSharedVariable', (req, res) => {
  Schedule.find({email : req.body.sharedVariable["Email"] }, function(err, schedules) {
    if (schedules.length) {
        Schedule.findOneAndUpdate({email : req.body.sharedVariable["Email"] }, {
        name: req.body.sharedVariable["Name"],
        email: req.body.sharedVariable["Email"],
        Period1: {
            courseCode1: req.body.sharedVariable["Period1"]["CourseCode"],
            section1: req.body.sharedVariable["Period1"]["Section"],
            room1: req.body.sharedVariable["Period1"]["Room"],
        },
        Period2: {
            courseCode2: req.body.sharedVariable["Period2"]["CourseCode"],
            section2: req.body.sharedVariable["Period2"]["Section"],
            room2: req.body.sharedVariable["Period2"]["Room"],
        },
        Period3: {
            courseCode3: req.body.sharedVariable["Period3"]["CourseCode"],
            section3: req.body.sharedVariable["Period3"]["Section"],
            room3: req.body.sharedVariable["Period3"]["Room"],
        },
        Period4: {
            courseCode4: req.body.sharedVariable["Period4"]["CourseCode"],
            section4: req.body.sharedVariable["Period4"]["Section"],
            room4: req.body.sharedVariable["Period4"]["Room"],
        },
        Period5: {
            courseCode5: req.body.sharedVariable["Period5"]["CourseCode"],
            section5: req.body.sharedVariable["Period5"]["Section"],
            room5: req.body.sharedVariable["Period5"]["Room"],
        },
        Period6: {
            courseCode6: req.body.sharedVariable["Period6"]["CourseCode"],
            section6: req.body.sharedVariable["Period6"]["Section"],
            room6: req.body.sharedVariable["Period6"]["Room"],
        },
        Period7: {
            courseCode7: req.body.sharedVariable["Period7"]["CourseCode"],
            section7: req.body.sharedVariable["Period7"]["Section"],
            room7: req.body.sharedVariable["Period7"]["Room"],
        },
        Period8: {
            courseCode8: req.body.sharedVariable["Period8"]["CourseCode"],
            section8: req.body.sharedVariable["Period8"]["Section"],
            room8: req.body.sharedVariable["Period8"]["Room"],
        },
        Period9: {
            courseCode9: req.body.sharedVariable["Period9"]["CourseCode"],
            section9: req.body.sharedVariable["Period9"]["Section"],
            room9: req.body.sharedVariable["Period9"]["Room"],
        },
        Period10: {
            courseCode10: req.body.sharedVariable["Period10"]["CourseCode"],
            section10: req.body.sharedVariable["Period10"]["Section"],
            room10: req.body.sharedVariable["Period10"]["Room"],
        },    
    }, {new:true}, function(err, schedule) {
        if (err) {
            console.log(err);
        }
        else {
            // save the updated document
            schedule.save();
            console.log("Updated");
        }
    });
    }
    else {
        let newSchedule = new Schedule({
        name: req.body.sharedVariable["Name"],
        email: req.body.sharedVariable["Email"],
        Period1: {
            courseCode1: req.body.sharedVariable["Period1"]["CourseCode"],
            section1: req.body.sharedVariable["Period1"]["Section"],
            room1: req.body.sharedVariable["Period1"]["Room"],
        },
        Period2: {
            courseCode2: req.body.sharedVariable["Period2"]["CourseCode"],
            section2: req.body.sharedVariable["Period2"]["Section"],
            room2: req.body.sharedVariable["Period2"]["Room"],
        },
        Period3: {
            courseCode3: req.body.sharedVariable["Period3"]["CourseCode"],
            section3: req.body.sharedVariable["Period3"]["Section"],
            room3: req.body.sharedVariable["Period3"]["Room"],
        },
        Period4: {
            courseCode4: req.body.sharedVariable["Period4"]["CourseCode"],
            section4: req.body.sharedVariable["Period4"]["Section"],
            room4: req.body.sharedVariable["Period4"]["Room"],
        },
        Period5: {
            courseCode5: req.body.sharedVariable["Period5"]["CourseCode"],
            section5: req.body.sharedVariable["Period5"]["Section"],
            room5: req.body.sharedVariable["Period5"]["Room"],
        },
        Period6: {
            courseCode6: req.body.sharedVariable["Period6"]["CourseCode"],
            section6: req.body.sharedVariable["Period6"]["Section"],
            room6: req.body.sharedVariable["Period6"]["Room"],
        },
        Period7: {
            courseCode7: req.body.sharedVariable["Period7"]["CourseCode"],
            section7: req.body.sharedVariable["Period7"]["Section"],
            room7: req.body.sharedVariable["Period7"]["Room"],
        },
        Period8: {
            courseCode8: req.body.sharedVariable["Period8"]["CourseCode"],
            section8: req.body.sharedVariable["Period8"]["Section"],
            room8: req.body.sharedVariable["Period8"]["Room"],
        },
        Period9: {
            courseCode9: req.body.sharedVariable["Period9"]["CourseCode"],
            section9: req.body.sharedVariable["Period9"]["Section"],
            room9: req.body.sharedVariable["Period9"]["Room"],
        },
        Period10: {
            courseCode10: req.body.sharedVariable["Period10"]["CourseCode"],
            section10: req.body.sharedVariable["Period10"]["Section"],
            room10: req.body.sharedVariable["Period10"]["Room"],
        },
        });

    
        console.log("got here!");
        newSchedule.save();
        } 
    });
    res.send("Success");
    console.log(req.body.sharedVariable);
  
  
});

    



app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, function()  {
    console.log("Server is running on port 3000");
});


