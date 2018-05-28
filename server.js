const express = require("express");
const bodyParser = require("body-parser");
const app = express();

var nodemailer = require('nodemailer');

var server = require("http").Server(app);
var io = require("socket.io")(server);

const port = 8000;


app.use(express.static(__dirname + "/public"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	'extended': 'true'
}));



//Nodemailer 
// Create a Transport instance using nodemailer
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "testtestovich909@gmail.com", // Your gmail address.
		pass:"testovichtestik",
        clientId: "118846207578-afpnpoch03vvomnj3vtsrru2s3jc4b3d.apps.googleusercontent.com",
        clientSecret: "dGbnc8wNmRMmbTLUGlRL_T3T",
        refreshToken: "1/ksSqd0HObndOk5SK__7zWzd80kCjul4ylCgefkV9ulU"
    }
  });
// Setup mail configuration
var sendMail = function(reciver){
var mailOptions = {
    from: 'testtestovich909@gmail.com', // sender address
    to: [reciver], // list of receivers
    subject: 'Support Sharks', // Subject line
//    text: 'Dear visitor! We really appreciate your attention. Our manager will read your letter. Moreover you will  get answer in 30 minutes. Best wishes, Support Sharks!', // plaintext body
    html: "<h3>Dear visitor,</h3><br><p>we really appreciate your attention. We will read your letter, prepare professional response and  you will  get answer in 30 minutes.</p><br><p>Best wishes, Support Sharks!</p>",
	date: new Date()
  };
// Send mail
  smtpTransport.sendMail(mailOptions, function(error,  response) {
    if (error) {
     console.log(error);
    return;
    } else {
      console.log("Message sent: " + response.message);
      return;
    }
    smtpTransport.close();
  });

}

io.sockets.on("connection", function (socket) {

socket.on("sendContactForm", function(data){
    sendMail(data.email);
    socket.emit("messageStatus","Message is sent")
	})
	
});


app.get("*", function (req, res) {
	res.sendFile(__dirname + "/public/index.html");
});


server.listen(port, function (err) {
	if (err) throw err;
	console.log("Server start port 8000!");
});
