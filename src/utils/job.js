const cron = require('node-cron');
const emailService = require('../services/email-service')
const sender = require('../config/emailConfig');

const setupJobs =  () => {
    cron.schedule('*/2 * * * *', async() => {
        const response = await emailService.fetchPendingEmails();

        response.forEach((email) => {

            sender.sendMail({
                to : email.recepientEmail,
                subject : email.subject,
                text : email.content
            }, async (err, data) => {
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                    await emailService.updateTicket(email.id, {status : "SUCCESS"});
                }
            });

            // ---------------------------------
            // emailService.sendBasicEmail(
            //     "ReminderService@airline.com",
            //     email.recepientEmail,
            //     email.subject,
            //     email.content
            // )
        })
        console.log(response)
        // console.log('running a task every five minutes');
        //  instead of console we have to get our logic so we will write the logic 
        // inside the services
    });
}

module.exports = setupJobs;