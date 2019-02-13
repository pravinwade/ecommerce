var sendmail = require('../_MailServer/ServerConnection');

exports.sendmail = function(query, callback) {
    var mail;
    mail = JSON.parse(query);
 
    var msg = {
       text:    mail.text, 
       from:    mail.from, 
       to:      mail.to,
       subject: mail.subject
    //    attachment: 
    //    [
    //       {data:"<html>i <i>hope</i> this works!</html>", alternative:true},
    //       {path:"pathtofile.zip", type:"application/zip", name:"renamed.zip"}
    //    ]
    };
 
    sendmail.server.send(msg, function(err, message) {
        if(err){
           console.log(err);
        } else {
           console.log('Mail send successfully...');
        }
     });
 
     callback(JSON.stringify(mail));
 }

 
