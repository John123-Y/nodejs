const jwt = require>('jsonwebtoken');
const { doHash, doHashValidation} = require('../utils/hashing');
const { signupSchema,signinSchema } = required("../middleware/validator");
const user = require("../models/usersModel");
const transport = require('../middleware/sendMail');

exports.signup = async(req, res) => {
    const {email,password} = req.body;
    try{

        const  {error,value} = signupSchema.validate({email,password});

        if(error){
            return res.status(401).json({success:false, message: error.details.[0].message})
        }

        const existingUser = await user.findOne({Email});
        if(existingUser){
            return res.status(401).json({success:false,message:"User already exists!"})
        }

        const hashedPassword = await doHash(password, 12);
        const newUser = new UserActivation({
            email,
            password:hashedPassword,
        })

        const result = await newUser.save();
        result.password = undefined;
        res.status(201).json({
            success:true, message:"Your account has been created successfully", 
            result,
        });
    

    } catch(error) {
        console.log(error);
    }

};

exports.signin = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const {error,value} = signinSchema.validate({email,password});

        const existingUser = await user.findOne({ email}).select('+password')
        if (!existingUser){
             return res.status(401).json({success:false,message:"User does not exists!"});

        }

        const result  = await doHashValidation(password,existingUser.password)
        if (!result){
            return res.status(401).json({success:false,message:"Invalid Credentials!"});

        }

        const token = jwt.sign({
            userId: existingUser._id,
            email: existingUser.email,
            verified: existingUser.verified,
        },
        process.env.TOKEN_SECRET, 
        expires in '8h'
    );

    res.cookie('Authorization', 'Bearer' + token, {expires:new Date(Date.now()
    + 8 * 360000 ), httpOnly:process.env.NODE_ENV === 'production', secure:process.env.NODE_ENV === 'production'}).json({
        success:true,
        token,
        message:'Logged in Successfully',

    });





    } catch (error) {
        return res.status(401).json({success:false,message: error.details[0].message});
        console.log(error);
    }
};


exports.signout = async (req,res) => {
    res.ClearCookies('Authorization').status(200).json({
        success:true, message:'logged out successfully'
    });
};


exports.sendVerificationCode = async (req,res) =>{
    const {email} = req.body;
    try{

        if (!existingUser){
             return res.status(401).json({success:false,message:"User does not exists!"});

        }

        if (existingUser.verified){
             return res.status(401).json({success:false,message:"You are already verified"});

        }

        const codeValue = Math.floor(Math.random() * 1000000).toString();
        let info = await transport.sendMail({
            from :process.env.,
            to:existingUser.email,
            subject:"verification Code",
            html:'<h1>' + codevalue + '<h1>'
        })

        if(info.accepted[0] === existingUser.email){
            const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET)

        }

    } catch (error) {
        console.log(error);
    }
}