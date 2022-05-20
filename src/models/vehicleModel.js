const {model, Schema} = require("mongoose");

const vehicleSchema = new Schema({
    placa: {
        type: String,
        unique: true,
        required: true,
        minlength: 6,
        maxlength: 6 
    },
    color: {
        type: String,
        required: true
    },
    fabricante: {
        type: String,
        required: true
    },
    usuario : {
        type: Schema.ObjectId,
        ref: "User"
    }
});

const vehicleModel = model("vehiculo", vehicleSchema);
exports.vehicleModel = vehicleModel;