const User = require("../models/auth")
const ErrorHandler= require("../utils/errorHandler")
const catchAsyncErrors= require("../middleware/catchAsyncErrors")

//Registrar un nuevo usuario /api/usuario/registro

exports.registroUsuario= catchAsyncErrors(async (req, res, next) =>{
    const {nombre, email, password} = req.body;

    const user = await User.create({
        nombre,
        email,
        password,
        avatar:{
            public_id:"1983926",
            url:"https://png.pngtree.com/png-vector/20191113/ourlarge/pngtree-avatar-human-man-people-person-profile-user-abstract-circl-png-image_1983926.jpg"
        }
    })
    const token=user.get.JwtToken();

    res.status(201).json({
        success:true,
        token,
        user
    })
})

 //iniciar sesion
exports.LoguinUsuario=catchAsyncErrors(async(req,res,next)=>{
    const{email,password}=req.body;

    //revisar si los campos estran completos
    if(!email||!password){
        return next(new ErrorHandler("Por favor ingrese email y contraseña",400))
    }
    //Verificar si el usuario esta en la base de datos
    const user=await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("correo invalido",401))
    }
    //Verificar contraseña
    const contrasenaOk=await user.compararContrasena(password);
    if(!contrasenaOk){
        return next(new ErrorHandler("contraseña invalida",401))
    }
    tokenEnviado(user,200,res)
})

//cerrar sesion
exports.logOut=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })  
    res.status(200).json({
        success:true,
        message:"cerró sesion"
    }) 
})