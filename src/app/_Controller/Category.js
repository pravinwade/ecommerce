var db = require('../_Dbconnection/db');
var httpMsgs = require("../_Crud/httpMsgs");
var util = require('util');

var mysql = '';

exports.GetCategory = function (req, res) {
    db.execmysql("call spGetCategoryDetails()",
        function (data, err) {
            if (err) {
                httpMsgs.show500(req, res, err);
            } else {
                httpMsgs.sendJson(req, res, data);
            }
            res.end();
        })
}

exports.gettext = function (req, res) {
    data = 'Hallo Angular';
    httpMsgs.sendJson(req, res, data);
}