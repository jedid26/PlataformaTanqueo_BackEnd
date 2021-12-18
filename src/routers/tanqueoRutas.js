const {Router} = require("express");
const tanqueoRutas = Router();
const {facturaModel} = require("../models/facturaModel");
import User from "../models/UserModel";

//API BUSCAR USUARIO POR DOCUMENTO
tanqueoRutas.get("/tanqueo", function(req, res) {
    try {
        User.findOne(req.body, function (err, data){
            console.log(data)
            if(data !== null && data !== undefined) {
                res.status(200).send({status:"ok", msg:"Usuario encontrado", data});
            } else {
                res.status(404).send({status:"error", msg:"Usuario no encontrado, debe registrarse"})
            }
        })
    } catch (error) {
        res.status(500).send({status:"error", msg:"ERROR"});
    }
});

//API GENERAR FACTURA TANQUEO
tanqueoRutas.post("/tanqueo", function(req, res) {
    const {placa, cantidad_gas, tipo_gas, estacion, pago, id} = req.body;
    try {
        User.findOne(id, function(err, usu){
            const usuario = usu._id;
            const newFactura = new facturaModel({placa, cantidad_gas, tipo_gas, estacion, pago, usuario})
            newFactura.save(function (err) {
                if(err){
                    res.status(500).send({status:"error", msg:"ERROR: Factura no guardada"});
                    console.log(err);
                    return false;
                }
                res.status(200).send({status:"ok", msg:"Factura guardada"})
            })
        });
    } catch (error) {
        res.status(500).send({status:"error", msg:"ERROR"});
    }
})











exports.tanqueoRutas = tanqueoRutas;
