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
    // "mongodb+srv://testuser:<password>@eia2.tkzjq.mongodb.net/<dbname>?retryWrites=true&w=majority"
    let databaseUrl = "mongodb+srv://testuser:passwort12345@eia2.tkzjq.mongodb.net/Hexenkessel?retryWrites=true&w=majority";
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
        //     if (_request.url) {
        //         let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        //         let jsonString: string = JSON.stringify(url.query, null, 1);
        //         _response.write(jsonString);
        //         storeRecipe(url.query);
        //     }
        //     _response.end();
        // }
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let command = url.query["command"];
            if (command == "retrieve") {
                handleRetrieveRecipes(_request, _response);
            }
            else {
                showRecipe(_request, _response);
            }
        }
    }
    function showRecipe(_request, _response) {
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let jsonString = JSON.stringify(url.query, null, 1);
            _response.write(jsonString);
            storeRecipe(url.query);
        }
        _response.end();
    }
    async function handleRetrieveRecipes(_request, _response) {
        console.log("Alert");
        let allRecipes = recipes.find();
        let allRecipesString = await allRecipes.toArray();
        for (let recipe of allRecipesString) {
            for (let key in Object(recipe)) {
                _response.write(key + ": " + Object(recipe)[key] + " <br>");
            }
            _response.write(" <br> ");
        }
        _response.end();
    }
    function storeRecipe(_recipe) {
        recipes.insert(_recipe);
    }
})(L07_Hexenkessel_Database = exports.L07_Hexenkessel_Database || (exports.L07_Hexenkessel_Database = {}));
//# sourceMappingURL=Server.js.map