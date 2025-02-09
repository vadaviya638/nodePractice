const { default: mongoose } = require("mongoose");

const UserSchema= new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    email:{
        type : String,
        required: true,
        unique: true
    },
    phone:{
type:Number
    }
    

},{
    timestamps: true,
    
}
)

module.exports=mongoose.model("User",UserSchema)