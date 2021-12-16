import mongoose from "mongoose";

//Conexión de la base de datos "producto" con mongoose
const URI = "mongodb://localhost:27017/plataforma_prueba";

mongoose.connect(URI)
    .then(res => console.log("Conectado a DB"))
    .catch(err => console.log("error; ", err))
module.exports = mongoose;
