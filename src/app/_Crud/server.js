var http = require("http");
var settings = require("../_Dbconnection/connectionString");
var httpMsgs = require("../_Crud/httpMsgs");
var cross = require("../_Cors/cors");
var mail = require("../_MailServer/mail");
var subcategory = require("../_Controller/SubCategory");
var category = require("../_Controller/Category");
var login = require("../_Controller/Login");
var user = require("../_Controller/User");

http.createServer(function (req, res) {
    cross(res);

    switch (req.method) {
        case "GET":
            if (req.url === "/getcategory") {
                category.GetCategory(req, res);
            } else if (req.url === "/getsalesubcategory") {
                subcategory.GetSaleSubCategory(req, res);
            } else if (req.url === "/getfreesubcategory") {
                subcategory.GetFreeSubCategory(req, res);
            } else if (req.url === "/gettext") {
                category.gettext(req, res);
            } else {
                httpMsgs.show404(req, res);
            }
            break;
        case "OPTIONS":

            break;
        case "PUT":

            break;
        case "POST":
            if (req.url === "/getsubcategory") {
                var reqBody = '';

                req.on("data", function (data) {
                    reqBody += data;

                    if (reqBody.length > 1e7) {
                        httpMsgs.show413(req, res);
                        return false;
                    } else {
                        subcategory.GetSubCategory(req, res, reqBody);
                    }
                });
            } else if (req.url === "/updateuserdetails") {
                var reqBody = '';

                req.on("data", function (data) {
                    reqBody += data;

                    if (reqBody.length > 1e7) {
                        httpMsgs.show413(req, res);
                        return false;
                    } else {
                        user.UpdateUser(req, res, reqBody);
                    }
                });
            } else if (req.url === "/checkuserstatus") {
                var reqBody = '';

                req.on("data", function (data) {
                    reqBody += data;

                    if (reqBody.length > 1e7) {
                        httpMsgs.show413(req, res);
                        return false;
                    } else {
                        user.CheckCountOfUser(req, res, reqBody);
                    }
                });
            } else if (req.url === "/updateusercount") {
                var reqBody = '';

                req.on("data", function (data) {
                    reqBody += data;

                    if (reqBody.length > 1e7) {
                        httpMsgs.show413(req, res);
                        return false;
                    } else {
                        user.UpdateUserCount(req, res, reqBody);
                    }
                });
            } else if (req.url === "/checkloginstatus") {
                var reqBody = '';

                req.on("data", function (data) {
                    reqBody += data;

                    if (reqBody.length > 1e7) {
                        httpMsgs.show413(req, res);
                        return false;
                    } else {
                        login.CheckLoginStatus(req, res, reqBody);
                    }
                });
            } else if (req.url === "/getuserlogindetails") {
                var reqBody = '';

                req.on("data", function (data) {
                    reqBody += data;

                    if (reqBody.length > 1e7) {
                        httpMsgs.show413(req, res);
                        return false;
                    } else {
                        login.GetLoginDetails(req, res, reqBody);
                    }
                });
            } else if (req.url === "/insertuser") {
                var reqBody = '';

                req.on("data", function (data) {
                    reqBody += data;

                    if (reqBody.length > 1e7) {
                        httpMsgs.show413(req, res);
                        return false;
                    } else {
                        user.InsertUser(req, res, reqBody);
                    }
                });
            } else if (req.url === "/sendmail") {
                var reqBody = '';

                req.on("data", function (data) {
                    reqBody += data;

                    if (reqBody.length > 1e7) {
                        httpMsgs.show413(req, res);
                        return false;
                    }
                })

                req.on("end", function () {
                    mail.SendMail(req, res, reqBody);
                });
            } else {
                httpMsgs.show404(req, res);
            }
            break;
        default:
            httpMsgs.show405(req, res);
            break;
    }
}).listen(settings.webPort, function () {
    console.log("started listing at: " + settings.webPort);
})