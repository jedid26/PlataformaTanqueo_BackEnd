import express from "express";
import cors from "cors";
import morgan from "morgan";
//const bodyParser = require("body-parser");

//Importación de rutas
import { vehicleRutas } from "./routers/vehicleRutas";
import UserRoutes from "./routers/user.routes" 

//Inizializaciones 
import mongoose from "./database";
//Se pasan los poderes de express a la variable app
const app = express();

//Settings
app.set('port', process.env.PORT || 8080);

//Middlewares
app.use(cors());
app.unsubscribe(morgan('dev'));
app.use(express.json());
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());
//app.use(require('connect').);

//APIs
app.use("/vehiculos", vehicleRutas);
app.use(UserRoutes);

//Servidor escuchando en puerto...
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});