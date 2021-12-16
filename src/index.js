import express from "express";
import cors from "cors";
import morgan from "morgan";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

//Importación de rutas
const { vehicleRutas } = require("./src/routers/vehicleRutas");
import UserRoutes from "./routers/user.routes" 

//Se pasan los poderes de express a la variable app
const app = express();

//Middlewares
app.use(cors());
app.unsubscribe(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//APIs
app.use("/vehiculos", vehicleRutas);
app.use(UserRoutes);

//Conexión de la base de datos
mongoose.connect(process.env.MONGO_URI)
    .then(res => console.log("Conectado a DB"))
    .catch(err => console.log("error; ", err))

//Servidor escuchando en puerto...
const port = process.env.PORT||8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});