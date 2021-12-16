const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

//Se pasan los poderes de express a la variable app
const app = express();


//Importación de rutas
const { vehicleRutas } = require("./src/routers/vehicleRutas");

//Middlewares
app.use(cors());
//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//APIs
app.use("/vehiculos", vehicleRutas);

//Conexión de la base de datos "producto" con mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(res => console.log("Conectado a DB"))
    .catch(err => console.log("error; ", err))

//Servidor escuchando en puerto...
const port = process.env.PORT||8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});