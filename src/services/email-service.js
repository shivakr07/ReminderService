const sender = require('../config/emailConfig');

//its just a function
const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
    try{
    const response = await sender.sendMail({
        from : mailFrom,
        to : mailTo,
        subject : mailSubject,
        text : mailBody
        });
        console.log(response);
    } catch(error){
        console.log(error);
    }
}

module.exports = {
    sendBasicEmail
}

/*
* SMTP -> a@b.com  <if we send mail from smtp server
* receiver -> receives from d@e.com
* 
* from : if we configure form as support@noti.com
*-> then receiver will see form tag as this <support@noti.com>
*/