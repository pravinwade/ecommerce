var db = require('../_MailServer/SendMail');
var httpMsgs = require("../_Crud/httpMsgs");
var util = require('util');

exports.SendMail = function(req, res, reqBody) {
   if (!reqBody) {
       throw new Error("Input not valid");
   } else {
       var data = reqBody;

       if (data) {
           var sql = '';
           sql = util.format(data);

           db.sendmail(sql, function(data, err) {
               if (err) {
                   httpMsgs.show500(req, res, err);
               } else {
                   httpMsgs.sendJson(req, res, data);
               }
               res.end();
           })
       } else {
           httpMsgs.show404(req, res);
       }
   }
}