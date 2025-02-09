const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs');

const RegisterSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    password: {
        type : String,
        required : true
    }
},
{
    timestamps: true,
    
})
RegisterSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
module.exports = mongoose.model("RegisterSchema",RegisterSchema)
