const express = require('express');
const bodyParser = require("body-parser");

const {PORT} = require('./config/serverConfig')


// const { sendBasicEmail } = require('./services/email-service')

const TicketController = require('./controllers/ticket-controller');

// const cron = require('node-cron');
const jobs = require('./utils/job')

const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.post('/api/v1/tickets', TicketController.create);

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
        jobs();
        
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