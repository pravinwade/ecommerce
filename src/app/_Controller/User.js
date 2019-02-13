var db = require('../_Dbconnection/db');
var httpMsgs = require("../_Crud/httpMsgs");
var util = require('util');

exports.InsertUser = function(req, res, reqBody) {
    var value;

    if (!reqBody) {
        throw new Error("Input not valid");
    } else {
        var data = reqBody;

        if (data) {
            mysql = util.format(data);
            value = JSON.parse(mysql.replace('undefined', ''));

            db.execmysql("call spInsertUser('" + value.Email + "', '" + value.Password + "', '" + value.FName + "', '" + value.MName + "', '" + value.LName + "', '" + value.Addr + "', '" + value.Zip + "', '" + value._Country + "', '" + value._State + "', '" + value._City + "', '" + value.MobileNumber + "')",
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

exports.UpdateUser = function(req, res, reqBody) {
    var value;

    if (!reqBody) {
        throw new Error("Input not valid");
    } else {
        var data = reqBody;

        if (data) {
            mysql = util.format(data);
            value = JSON.parse(mysql.replace('undefined', ''));

            db.execmysql("call spUpdateUser('" + value.UId + "', '" + value.Email + "', '" + value.FName + "', '" + value.MName + "', '" + value.LName + "', '" + value.Addr + "', '" + value.Zip + "', '" + value._Country + "', '" + value._State + "', '" + value._City + "', '" + value.MobileNumber + "')",
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

exports.UpdateUserCount = function(req, res, reqBody) {
    var value;

    if (!reqBody) {
        throw new Error("Input not valid");
    } else {
        var data = reqBody;

        if (data) {
            mysql = util.format(data);
            value = JSON.parse(mysql.replace('undefined', ''));

            db.execmysql("call spUpdateUserCount('" + value.UId + "', '" + value.Email + "', '" + value.MobileNumber + "')",
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

exports.CheckCountOfUser = function(req, res, reqBody) {
    var value;

    if (!reqBody) {
        throw new Error("Input not valid");
    } else {
        var data = reqBody;

        if (data) {
            mysql = util.format(data);
            value = JSON.parse(mysql.replace('undefined', ''));

            db.execmysql("call spGetUserCount('" + value.UserId + "')",
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