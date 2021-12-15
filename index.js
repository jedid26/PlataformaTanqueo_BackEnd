const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//Se pasan los poderes de express a la variable app
const app = express();

//Importación de rutas
const { vehicleRutas } = require("./src/routers/vehicleRutas");

//Middlewares
app.use(cors());
app.use(express.json());

//APIs
app.use("/vehiculos", vehicleRutas);

//Conexión de la base de datos "producto" con mongoose
mongoose.connect("mongodb://localhost:27017/plataforma_prueba")
    .then(res => console.log("Conectado a DB"))
    .catch(err => console.log("error; ", err))

//Servidor escuchando en puerto...
const port = process.env.PORT||3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});