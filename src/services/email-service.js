const sender = require('../config/emailConfig');

const TicketRepository = require('../repository/ticket-repository')
const repo = new TicketRepository();
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
}   // 
const fetchPendingEmails = async(timestamp) => {
    try{
        const response = await repo.get({status : "PENDING"});
        return response;
    } catch(error) {
        console.log(error);
    }
}

const updateTicket = async(ticketId, data) => {
    try{
        console.log(data);
        const response = await repo.update(ticketId, data);
        return response;
    } catch(error){
        console.log(error);
    }
}

const createNotification = async (data) => {
    try{
        console.log(data);
        const response = await repo.create(data);
        return response;
    } catch(error){
        console.log(error);
    }
}

// const testingQueue  = async(data) => {
//     console.log("Inside service layer", data);
// }

const subscribeEvents = async(payload) => {
    let service = payload.service;
    let data = payload.data;
    switch(service) {
        case 'CREATE_TICKET':
            await createNotification(data);
            // create notification expects the data
            break;
        
        case 'SEND_BASIC_MAIL':
            await sendBasicEmail(data);
            break;
        default:
            console.log('No valid event received');
            break;
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket,
    // testingQueue,
    subscribeEvents
}

/*
* SMTP -> a@b.com  <if we send mail from smtp server
* receiver -> receives from d@e.com
* 
* from : if we configure form as support@noti.com
*-> then receiver will see form tag as this <support@noti.com>
*/