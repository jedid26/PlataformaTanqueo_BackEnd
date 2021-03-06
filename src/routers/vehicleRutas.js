const {Router} = require("express");
const vehicleRutas = Router();
const {vehicleModel} = require("../models/vehicleModel");

//ENDPOINT GUARDAR NUEVO VEHICULO
vehicleRutas.post("/nuevo", function (req, res){
    const {placa, color, fabricante, usuario} = req.body; //e.g {placa: "XXX000", color: "Rojo", fabricante: "Renault", modelo: "Logan 2018"}
    const newVehicle = new vehicleModel({ placa, color, fabricante, usuario });
    newVehicle.save(function (error){
        if (error){
            res.status(500).send({status:"error", msg:"ERROR: Vehículo no guardado", error});
            return false;
        } 
        res.status(200).send({status:"ok", msg:"Vehículo guardado"});
    });
});

//ENDPOINT CONSULTAR VEHICULOS
// async/await tira Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
vehicleRutas.get("/mis_vehiculos/:id", function(req, res) {
    try {
        vehicleModel.find({usuario:`${req.params.id}`}, function (err, vehiculos){
            if (vehiculos !== undefined) res.status(200).send({status:"ok", msg:"Vehículos encontrados", vehiculos});
            else res.status(200).send({status:"no", msg:"Usuario sin vehículos registrados", vehiculos})
        })
    } catch (error) {
        res.status(500).send({status:"error", msg:"ERROR"});
    }
})

//ENDPOINT OBTENER _id VEHICULO EDITAR/ELIMINAR
vehicleRutas.get("/buscar/:id", function (req, res) {
    try {
        vehicleModel.findById(req.params.id, function (err, data) {
        return res.status(200).send({status:"ok", msg:"vehículo encontrado", data})
        })
    } catch (error) {
        res.status(500).send({status:"error", msg:"ERROR al buscar"});
    }
});

//ENDPOINT EDITAR VEHICULO https://youtu.be/-bI0diefasA?t=6495
vehicleRutas.put("/edit/:id", function (req, res) {
    const {color} = req.body;
    try {
        vehicleModel.findByIdAndUpdate(req.params.id, {"color": `${color}`}, function (err, result) {
            res.status(200).send({status:"ok", msg:"Editado con éxito"});
        })
    } catch (error) {
        res.status(500).send({status:"error", msg:"ERROR al editar"});
    }
});

//ENDPOINT ELIMINAR VEHICULO
vehicleRutas.delete("/delete/:id", async function (req, res) {
    try {
        await vehicleModel.findByIdAndRemove(req.params.id)
        return res.status(200).send({status:"ok", msg:"Eliminado correctamente"})
    } catch (error) {
        res.status(500).send({status:"error", msg:"ERROR al eliminar"});
    }
});

exports.vehicleRutas = vehicleRutas;