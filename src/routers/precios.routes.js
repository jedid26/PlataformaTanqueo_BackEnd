import { Router } from "express";
const router = Router();

import Precios from "../models/PreciosModel";

router.post('/precios', async (req, res) => {
    try {
       const { tipo, price, fechaInicio, fechaFinal  } = req.body;

       if (!(tipo == "extra" || tipo == "corriente")) {
           return res.json({ err: "Solo se acepta extra y corriente" })
       }

       const precios = new Precios({
           tipo,
           price,
           fechaInicio,
           fechaFinal
       });
       await precios.save();
       res.json({ msg: "Precio actualizado" })
    } catch (error) {
        res.json({ msg: "Error al actualizar" })
    }
});

router.put('/precios', async (req, res) => {
    
    const { tipo, price, fechaInicio, fechaFinal  } = req.body;
    
    try {

        await Precios.updateOne({ tipo: tipo }, { price: price, fechaInicio: fechaInicio, fechaFinal: fechaFinal });
        res.json({ msg: "Datos actualiazdos"})
        
    } catch (error) {
        res.json({ err: "Error al actualizar" })
    }
});

router.get('/inventario', async (req, res) => {

    try {
        const corriente = await Precios.findOne({ tipo: "corriente" }, { cantidad: 1 });
        const extra = await Precios.findOne({ tipo: "extra" }, { cantidad: 1 });
        res.json({ corriente: corriente.cantidad, extra: extra.cantidad })
    } catch (error) {
        res.json({ err: "Error al traer datos"})
    }
})

router.put('/inventario', async (req, res) => {
    const { tipo, cantidad } = req.body;

    try {
        
        await Precios.updateOne({ tipo: tipo }, { cantidad: cantidad });
        res.json({ msg: "Cantidad en stock actualizada" })

    } catch (error) {
        res.json({ err: "Error al actualizar" })
    }

});

module.exports = router;