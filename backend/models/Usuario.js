import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema ({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    token: {
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario