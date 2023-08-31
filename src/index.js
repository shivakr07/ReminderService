const express = require('express');
const bodyParser = require("body-parser");

const {PORT, REMINDER_BINDING_KEY} = require('./config/serverConfig');

const { createChannel } = require('./utils/messageQueue');


// const { sendBasicEmail } = require('./services/email-service')

const TicketController = require('./controllers/ticket-controller');
const EmailService =  require('./services/email-service');


// const cron = require('node-cron');
const jobs = require('./utils/job')
const { subscribeMessage } = require('./utils/messageQueue')


const setupAndStartServer = async() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.post('/api/v1/tickets', TicketController.create);
   
    const channel = await createChannel();
    // subscribeMessage(channel, undefined, REMINDER_BINDING_KEY);
    subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);
    

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
        // jobs();
        
        // sendBasicEmail(
        //     'support@admin.com',
        //     'kumarshiva0707@gmail.com',
        //     'This is a testing email',
        //     'hey, how are you , i hope you like the support'
        // )
    
        
    });
}

setupAndStartServer(); 
// 
// 