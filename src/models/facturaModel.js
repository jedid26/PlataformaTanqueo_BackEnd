const {model, Schema, SchemaTypes} = require("mongoose");

const facturaSchema = new Schema({
    placa: {
        type: "string",
        required: true,
        minlength: 6,
        maxlength: 6 
    },
    cantidad_gas: {
        type: "number",
        required: true
    },
    tipo_gas: {
        type: "string",
        required: true
    },
    estacion: {
        type: "string",
        required: true
    },
    fecha :{
        type: "string",
        required: true
    },
    pago: {
        type: Schema.Types.Decimal128,
        required: true
    },
    usuario : {
        type: Schema.ObjectId,
        ref: "users"
    }
});

facturaSchema.pre("save", function (next){
    const time = Date.now();
    const today = new Date(time);
    this.fecha = today.toUTCString();
    next();
});

const facturaModel = model("factura", facturaSchema);
exports.facturaModel = facturaModel;