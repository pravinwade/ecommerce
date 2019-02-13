var db = require('../_Dbconnection/db');
var httpMsgs = require("../_Crud/httpMsgs");
var util = require('util');

var mysql = '';

exports.GetFreeSubCategory = function (req, res) {
    db.execmysql("call spGetFreeSubCategory()",
        function (data, err) {
            if (err) {
                httpMsgs.show500(req, res, err);
            } else {
                httpMsgs.sendJson(req, res, data);
            }
            res.end();
        })
}

exports.GetSaleSubCategory = function (req, res) {
    db.execmysql("call spGetSaleSubCategory()",
        function (data, err) {
            if (err) {
                httpMsgs.show500(req, res, err);
            } else {
                httpMsgs.sendJson(req, res, data);
            }
            res.end();
        })
}

exports.GetSubCategory = function(req, res, reqBody) {
    var value;

    if (!reqBody) {
        throw new Error("Input not valid");
    } else {
        var data = reqBody;

        if (data) {
            mysql = util.format(data);
            value = JSON.parse(mysql.replace('undefined', ''));

            db.execmysql("call spGetSubCategoryDetails('" + value.CatId + "')",
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