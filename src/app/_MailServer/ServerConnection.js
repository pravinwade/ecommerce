var email = require('emailjs/email');

var _server  = email.server.connect({
    host:    "smtp.aneeshnetworking.com",
    user:    "contactus@aneeshnetworking.com", 
    password:"con12345",
    domain: "aneeshnetworking.com",
    port:    25,
    ssl:     false
 });

exports.server = _server;