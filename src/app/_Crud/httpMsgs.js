var settings = require("../_Dbconnection/connectionString");

exports.show500 = function(req, res, err) {
    if (settings.httpMsgsFormat === "HTML") {
        res.writeHead(500, "Error occured", { "Content-Type": "text/html" });
        res.write("<html><head>500</head><body></body>500. Internal Error. Details: " + err + "</html>");
    } else {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ data: "ERROR occured:" + err }));
    }

    res.end();
};

exports.show405 = function(req, res) {
    if (settings.httpMsgsFormat === "HTML") {
        res.writeHead(405, "Method not supported", { "Content-Type": "text/html" });
        res.write("<html><head>405</head><body></body>Method not supported</html>");
    } else {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ data: "Method not supported" }));
    }

    res.end();
};

exports.show404 = function(req, res) {
    if (settings.httpMsgsFormat === "HTML") {
        res.writeHead(404, "Resource not found", { "Content-Type": "text/html" });
        res.write("<html><head>404</head><body></body>Resource not found</html>");
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ data: "Resource not found" }));
    }

    res.end();
};

exports.send200 = function(req, res) {
    res.writeHead(200, "Resource not found", { "Content-Type": "application/json" });
    res.end();
}

exports.show413 = function(req, res) {
    if (settings.httpMsgsFormat === "HTML") {
        res.writeHead(413, "Request entity To Large", { "Content-Type": "text/html" });
        res.write("<html><head>413</head><body></body>Request entity To Large</html>");
    } else {
        res.writeHead(413, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ data: "Request entity To Large" }));
    }

    res.end();
};

exports.sendJson = function(req, res, data) {
    res.writeHead(200, { "Content-Type": "application/json" });

    if (data) {
        res.write(JSON.stringify(data));
    }
    res.end();
}