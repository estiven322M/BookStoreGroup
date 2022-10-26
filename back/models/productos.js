const mongoose=require("mongoose")

const productosSchema=mongoose.Schema({
    nombre:{
        type:String,
        required:[true,"Por favor registra el nombre del producto."],
        trim:true,
        maxLength:[100,"El nombre del producto no debe exceder los 100 caracteres."]
    },
    precio:{
        type: Number,
        required:[true,"Por favor registre el precio del producto."],
        maxLength:[6, "El precio del producto no puede estar por encima de 999.999"],
        default: 0.0
    },
    descripcion:{
      type:String,
      required:[true,"Por favor registre una descripcion para el producto."]
    },
    calificacion:{
        type: Number,
        default: 0
    },
    imagen:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    categoria:{
        type:String,
        required:[true,"Por favor seleccione la categoria del producto."],
        enum:{
            values:[
                "Book Learn A1",
                "Book Learn A2",
                "Book Learn B1",
                "Book Learn B2",
                "Book Learn C1",
                "Book Learn C2",
                "Cartilla Grafica",
                "Diccionary",
                "Wordbook A1",
                "wordbook A2",
                "wordbook B1",
                "wordbook B2",
                "wordbook C2",
                "wordbook C2",
                
            ]
        }
    },
    vendedor:{
        type:String,
        required:[true,"Por favor registre el vendedor de producto"]
    },
    inventario:{
        type: Number,
        required:[true, "Por favor registre el stock del producto"],
        maxLength:[4,"Cantidad maxima del producto no puede sobrepasar 9999"],
        default:0
    },
    numCalificaciones:{
        type:Number,
        default:0
    },
    opiniones:[
        {
            nombreCliente:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comentario:{
                type:String,
                required:true
            }
        }
    ],
    fechaCreacion:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model("productos",productosSchema)

