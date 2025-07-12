const joi= require('joi');

exports.signupSchema = Ji.object({
    email:Joi.string()
    .min(6)
    .max(40).
    required()
    .email({
        tlds:{ allow:['com','net','ng']}
    }),

    password:Joi.string().required()
    .pattern(new RegExp('')),

});

exports.signinSchema = Joi.object({
    email:Joi.string()
    .min(6)
    .max(40).
    required()
    .email({
        tlds:{ allow:['com','net','ng']}
    }),

    password:Joi.string().required()
    .pattern(new RegExp('')),

});