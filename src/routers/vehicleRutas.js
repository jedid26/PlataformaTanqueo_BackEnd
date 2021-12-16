const {Router} = require("express");
const vehicleRutas = Router();
const {vehicleModel} = require("../models/vehicleModel");


//API GUARDAR NUEVO VEHICULO
vehicleRutas.post("/nuevo", function (req, res){
    const {placa, color, fabricante} = req.body; //e.g {placa: "XXX000", color: "Rojo", fabricante: "Renault", modelo: "Logan 2018"}
    const newVehicle = new vehicleModel({ placa, color, fabricante });

    newVehicle.save(function (error){
        if (error){
            res.status(500).send({status:"error", msg:"ERROR: Vehículo no guardado", error});
            return false;
        } 
        res.status(200).send({status:"ok", msg:"Vehículo guardado"});
    });
});

//API CONSULTAR VEHICULOS
// async/await tira Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
vehicleRutas.get("/mis_vehiculos", function(req, res) {
    try {
        vehicleModel.find({}, function (error, vehiculos){
        return res.status(200).send({status:"ok", msg:"Vehículos encontrados", vehiculos});
        })
    } catch (error) {
        res.status(500).send({status:"error", msg:"ERROR"});
    }
})

//API OBTENER _id VEHICULO EDITAR/ELIMINAR

vehicleRutas.get("/edit/:id", async function (req, res) {
    let vehiculo = await vehicleModel.findById(req.params._id);
    res.render('/edit_vehiculo',{vehiculo});
});

//API EDITAR VEHICULO https://youtu.be/-bI0diefasA?t=6495
vehicleRutas.put("/edit", async function (req, res) {
    const {id, color} = req.body;

    try {
        await vehicleModel.findByIdAndUpdate(id, {color});
        return res.status(200).send({status:"ok", msg:"editado correctamente"})
    } catch (error) {
        res.status(500).send({status:"error", msg:"ERROR al editar"});
    }
});
   

//API ELIMINAR VEHICULO
vehicleRutas.delete("/delete/:id", async function (req, res) {
    const {id} = req.params.id;
    try {
        await vehicleModel.findByIdAndRemove(id)
        return res.status(200).send({status:"ok", msg:"eliminado correctamente"})
    } catch (error) {
        res.status(500).send({status:"error", msg:"ERROR al eliminar"});
    }
});

exports.vehicleRutas = vehicleRutas;