var db = require('../_Dbconnection/db');
var httpMsgs = require("../_Crud/httpMsgs");
var util = require('util');

exports.GetLoginDetails = function(req, res, reqBody) {
    var value;

    if (!reqBody) {
        throw new Error("Input not valid");
    } else {
        var data = reqBody;

        if (data) {
            mysql = util.format(data);
            value = JSON.parse(mysql.replace('undefined', ''));

            db.execmysql("call spGetUserDetails('" + value.UserId + "', '" + value.Password + "')",
                function(data, err) {
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

exports.CheckLoginStatus = function(req, res, reqBody) {
    var value;

    if (!reqBody) {
        throw new Error("Input not valid");
    } else {
        var data = reqBody;

        if (data) {
            mysql = util.format(data);
            value = JSON.parse(mysql.replace('undefined', ''));

            db.execmysql("call spLoginStatus('" + value.UserId + "', '" + value.Password + "')",
                function(data, err) {
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