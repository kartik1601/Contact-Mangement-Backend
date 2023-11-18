/* Install the dotenv dependency in the root folder: npm i dotenv */
require("dotenv").config(); // for using the port in a secured file as process.env. (config() is used for this)
import express, {Request,Response} from "express";
import contactRouter from "./routes/contactRoutes";

const app = express(); // creating an express application

const port = process.env.PORT || 5050; // if the specified port in env is null, then use an alternate port

// it enables the server to handle the json client responses
app.use(express.json());
/*  using the routes from an external folder - middleware
    using a default address before the joining the address from the router
*/
app.use("/api/v1/contacts",contactRouter);

// listen() - method - it will start an express server at the specified port
app.listen(port, () => { // callback function
    console.log(`Server connected with ${port}.`);
}); // server will now start listening to all incoming HTTP requests