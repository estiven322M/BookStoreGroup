const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const crypto=("crypto")

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Por favor ingrese el nombre"],
        maxlength: [120, "Nombre no puede exceder los 120 caracteres"]
    },
    email: {
        type: String,
        required: [true, "Por favor ingrese el correo electronico"],
        unique: true,
        validate: [validator.isEmail, "Por favor ingrese un email valido"]
    },
    password: {
        type: String,
        required: [true, "Por favor registre una contraseña"],
        minlength: [8, "Tu contraseña no puede tener menos de 8 caracteres"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date

})
//Encripta contraseña antes de guardarla
usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//Decodificamos contraseña y comparamos
usuarioSchema.methods.compararPass=async function(passDada){
    return await bcrypt.compare(passDada,this.password)
}

//Retornar un JWT TOKEN
usuarioSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_TIEMPO_EXPIRACION
    })
}

//Generar un Token para reset contraseña
usuarioSchema.methods.genResetPasswordToken=async function (){
    const resetToken=crypto.randomBytes(20).toString('hex')

    //hashear y resetear token
    this.resetPasswordToken=resetToken;

    //setear fecha expiracion token
    this.resetPasswordExpire=Date.now()+30*60*1000//el token dura 30 minutos

    return resetToken
}



module.exports = mongoose.model("auth", usuarioSchema)