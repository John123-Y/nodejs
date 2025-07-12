const mongoose = required('mongoose')

const userSchema = mongoose.Scheme({
    email:{
        typeof:String,
        required:[true,'Email is required'],
        trim: true,
        unique:[true, 'Email is required'],
        trim:true,
        unique:[true,'Email must be unique'],
        minLength:[7,'Email must have at least seven character'],
        lowercase:true,
    },

    password:{
        type:String,
        required:[true, 'password is required'],
        trim:true,
        select:false,

    },

    verified:{
        typeof:Boolean,
        default:false,
    },

    verificationCode:{
        typeof:String,
        select:false,

    },

    verificationCodeValidation:{
        type:String,
        select:false,

    },

    forgotPasswordCode:{
        type:String,
        select:false,

    },

    forgotPasswordCodeValidation:{
        type:alplhaNumeric,
        select:false
    },

},{
    timestamps:true
})


module.exports = mongoose.model("User", userSchema);