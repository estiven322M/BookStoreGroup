const User = require("../models/auth")
const ErrorHandler= require("../utils/errorHandler")
const catchAsyncErrors= require("../middleware/catchAsyncErrors")
const tokenEnviado=require("../utils/JwtToken")
const sendEmail=require("/..utils./sendEmail")
const crypto=require("crypto")

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


//olvide mi contraseña
exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("Usuario no se encuentra registrado",400))
    }
    const resetToken=user.getResetPasswordToken();
    
    await user.save({validateBeforeSave:false})

    //crear url para hacer el reset de la contraseña
    const resetUrl=`${req.protocol}://${req.get("host")}/api/resetPassword/${resetToken}`

    const  mensaje=`Tu link para ajustar una nueva contraseña es el siguiente:\n\n${resetUrl}\n\n
    Si no solicitaste este link, por favor comunicate con soporte.\n\n Att:\nBookStoreGroup`

    try{
        await sendEmail({
            email:user.email,
            subject:"BookStore recuperacion de contraseña",
            mensaje
        })
        res.status(200).json({
            success:true,
            message:`correo enviado a: ${user.email}`
        })
    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message,500))
    }



    //resetear la contraseña
    exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{
        //Hash el token que llego a la url
        const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex")
        //Buscar el usuario que va a reseterar la contraseña
        const user=await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt: Date.now()}
        })
        //El usuario si esta en la base de datos
        if(!user){
            return next(new ErrorHandler("El token es invalido o ya expiro",400))
        }
        //Diligenciamos bien los campos?
        if(req.body.password!==req.body.confirmPassword){
            return next(new ErrorHandler("contraseñas no coinciden",400))
        }

        //Setear la contraseña
        user.password=req.body.password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save();
        sendToken(user,200,res)


    })
    
})