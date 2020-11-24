"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.L07_Hexenkessel_Database = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var L07_Hexenkessel_Database;
(function (L07_Hexenkessel_Database) {
    let recipes;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    // let databaseUrl: string = "mongodb://localhost:27017";
    // let databaseUrl: string = "mongodb+srv://testuser:<passwort12345>@eia2.tkzjq.mongodb.net/<Hexenkessel>?retryWrites=true&w=majority";
    let databaseUrl = "mongodb%2Bsrv%3A%2F%2Ftestuser%3A%3Cpasswort12345%3E%40eia2.tkzjq.mongodb.net%2F%3CHexenkessel%3E%3FretryWrites%3Dtrue%26w%3Dmajority";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        recipes = mongoClient.db("Hexenkessel").collection("Recipes");
        console.log("Database connection ", recipes != undefined);
    }
    function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let jsonString = JSON.stringify(url.query, null, 1);
            _response.write(jsonString);
            storeRecipe(url.query);
        }
        _response.end();
    }
    function storeRecipe(_recipe) {
        recipes.insert(_recipe);
    }
})(L07_Hexenkessel_Database = exports.L07_Hexenkessel_Database || (exports.L07_Hexenkessel_Database = {}));
//# sourceMappingURL=Server.js.map