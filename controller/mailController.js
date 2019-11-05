var nodemailer = require('nodemailer');

let sendingMail = (req, res) =>{

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'zeussyed97@gmail.com',
        pass: 'Wolverinesyed'
    }
});

/*var mailOptions = {
    from: 'nadeemcool47@gmail.com',
    to: 'syed.14cs@kct.ac.in, nadeemcool47@gmail.com',
    subject: 'Sending test mail',
    text: `HI This is syed`
};*/ let mailOptions = req.body;

transporter.sendMail(mailOptions, (err, info)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('Email sent'+info.response);
        res.send(`Email sent ${info.response}`);
    }
})

}

module.exports = {
    sendingMail: sendingMail
}