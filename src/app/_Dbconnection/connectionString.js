var dbConfing = {
    host: "208.91.198.197",
    user: "paintingecom",
    password: "Balaji88@@",
    database: "dbpaintingecommerce",
    port: 3306,
    insecureAuth: true,
    localAddress: "208.91.198.197"
}

/*var dbConfing = {
    host: "localhost",
    user: "tejomayart_paintingecom",
    password: "Balaji88@@",
    database: "tejomayart_dbpaintingecommerce",
    port: 3306,
    insecureAuth: true,
    localAddress: "localhost"
}*/

exports.connectionString = dbConfing;
exports.webPort = 3000;
exports.httpMsgsFormat = "JSON";