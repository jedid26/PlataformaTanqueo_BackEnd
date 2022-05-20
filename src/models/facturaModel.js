const {model, Schema} = require("mongoose");

const facturaSchema = new Schema({
    placa: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 6 
    },
    cantidad_gas: {
        type: Number,
        required: true
    },
    tipo_gas: {
        type: String,
        required: true
    },
    estacion: {
        type: String,
        required: true
    },
    fecha :{
        type: String
    },
    pago: {
        type: Number,
        required: true
    },
    usuario : {
        type: Schema.ObjectId,
        ref: "User",
        required: true
    }
});

facturaSchema.pre("save", function (next){
    const time = Date.now();
    const today = new Date(time);
    this.fecha = today.toLocaleDateString("en-GB");
    next();
});

const facturaModel = model("factura", facturaSchema);
exports.facturaModel = facturaModel;