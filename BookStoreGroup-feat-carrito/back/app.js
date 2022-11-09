const express=require("express");
const app = express();
const cookieParser=require("cookie-parser")


app.use(express.json());
app.use(cookieParser());

//Importar rutas
const productos=require("./routes/products")


app.use('/api',productos) //Sujeto a decision (ruta del navegador)






module.exports=app