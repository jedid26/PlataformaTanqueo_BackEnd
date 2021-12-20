import mongoose, { model, Schema } from "mongoose";

const PreciosShema = new Schema({
    tipo: { type: String, enum: ['corriente', 'extra'], required: true },
    price: { type: Number, required: true} ,
    fechaInicio: { type: Date, required: true },
    fechaFinal: { type: Date, required: true },
    cantidad: { type: Number, default: 0, required: true}
})

module.exports = model('Precios', PreciosShema)