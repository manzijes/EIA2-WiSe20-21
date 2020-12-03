import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace L07_Hexenkessel_Database {

    interface Recipe {
        [type: string]: string | string[] | undefined;
    }

    let recipes: Mongo.Collection;

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;

    // let databaseUrl: string = "mongodb://localhost:27017";
    // "mongodb+srv://testuser:<password>@eia2.tkzjq.mongodb.net/<dbname>?retryWrites=true&w=majority"
    let databaseUrl: string = "mongodb+srv://testuser:passwort12345@eia2.tkzjq.mongodb.net/Hexenkessel?retryWrites=true&w=majority";

    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        console.log("Server starting on port:" + _port);

        server.listen(_port);
        server.addListener("request", handleRequest);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        recipes = mongoClient.db("Hexenkessel").collection("Recipes");
        console.log("Database connection ", recipes != undefined);
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
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
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let command: string | string[] | undefined = url.query["command"];
            
            if (command == "retrieve") {
                handleRetrieveRecipes(_request, _response);
            } else {
                showRecipe(_request, _response);
            }
        }
    }

    function showRecipe(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let jsonString: string = JSON.stringify(url.query, null, 1);
            _response.write(jsonString);
            storeRecipe(url.query);
        }
        _response.end();
    }

    async function handleRetrieveRecipes(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("Alert");
        let allRecipes: Mongo.Cursor = recipes.find();
        let allRecipesString: string[] = await allRecipes.toArray();

        for (let recipe of allRecipesString) {
            for (let key in Object(recipe)) {
                _response.write(key + ": " + Object(recipe)[key] + "/n");
            }
            _response.write("/n");
        }
        _response.end();
    }


    function storeRecipe(_recipe: Recipe): void {
        recipes.insert(_recipe);
    }
}