

const Client = require('node-rest-client').Client;
 
const client = new Client();

/**
 * 
 * Exposing a method whick will take the request parameters for sending the 
 * notification request to the notification service
 */

module.exports = (subject, content, recepient, requester) => {
    console.log(subject, content, recepient, requester);
    // Create the request body
    let mailBody = {
        subject: subject,
        recepientEmails: recepient,
        content: content,
        requester: requester
    }
    // Prepare the headers
    const headers = {'Content-Type': 'application/json'}
    // Combine headers and req body together
    const args = {
        data: mailBody,
        headers,
    }

    // Make POST call and handle the response
    try {
        client.post('http://localhost:9990/crm/api/v1/create_notification', args, (data, res) => {
            console.log('Request sent');
            console.log(data);
        })
    } catch (err) {
        console.log(err);
    }
    
}