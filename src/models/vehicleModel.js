const {model, Schema} = require("mongoose");

const vehicleSchema = new Schema({
    placa: {
        type: "string",
        unique: true,
        required: true,
        minlength: 6,
        maxlength: 6 
    },
    color: {
        type: "string",
        required: true
    },
    fabricante: {
        type: "string",
        required: true
    },
    usuario : {
        type: Schema.ObjectId,
        ref: "User"
    }
});

const vehicleModel = model("vehiculo", vehicleSchema);
exports.vehicleModel = vehicleModel;