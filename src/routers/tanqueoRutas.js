const {Router} = require("express");
const tanqueoRutas = Router();
const {facturaModel} = require("../models/facturaModel");
import User from "../models/UserModel";

/** LOGICA FACTURA MODELS Y TANQUEO
 * FacturaModel y TanqueoRutas se unen así: 
 * Una operación tanqueo generará una factura relacionado a UN UNICO USUARIO
 * Todas las API de FACTURA y TANQUEO se encuentran aquí 
 */

//API BUSCAR USUARIO POR DOCUMENTO
tanqueoRutas.get("/buscar/:id", function(req, res) {
    //Documento en string por URI enviado por front, se consulta por documento (cc,ce,pp)
    try {
        User.findOne({idNumber:`${req.params.id}`}, function (err, data){
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
tanqueoRutas.post("/tanquear", function(req, res) {
    //JSON enviado por front (usuario debe ser el ObjectId del usuario)
    const {placa, cantidad_gas, tipo_gas, estacion, pago, usuario} = req.body;
    try {
            const newFactura = new facturaModel({placa, cantidad_gas, tipo_gas, estacion, pago, usuario})
            newFactura.save(function (err) {
                if(err){
                    res.status(500).send({status:"error", msg:"ERROR: Factura no guardada"});
                    console.log(err);
                    return false;
                }
                res.status(200).send({status:"ok", msg:"Factura guardada"})
            })
    } catch (error) {
        res.status(500).send({status:"error", msg:"ERROR"});
    }
})

//API LISTAR FACTURAS
tanqueoRutas.get("/listar/:id", function (req, res) {
    try {
        facturaModel.find({usuario:`${req.params.id}`}, function (err, data) {
            res.status(200).send({status:"ok", msg:"Facturas encontradas", data})
        })
    } catch (error) {
        res.status(500).send({status:"error", msg:"ERROR"})
    }

})











exports.tanqueoRutas = tanqueoRutas;
