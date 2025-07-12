const nodeMailer = require('nodeMailer')

const transport = nodeMailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.,
        pass:NODE_CODE_SENDING_EMAIL_PASSWORD,
    },
});


module.exports = transport;