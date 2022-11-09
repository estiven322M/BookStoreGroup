//crear y enviar un token guardado en un cokie
const tokenEnviado=(user,statusCode,res)=>{
    //creamos el token
    const token=user.getJwtToken();

    //Opciones del token
    const Opciones={
        expires: new Date(
            Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000
        ),
        httpOnly:true
    }
    res.status(statusCode).cookie("token",token,Opciones).json({
        succes:true,
        token,
        user
    })
}