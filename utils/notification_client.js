

const Client = require('node-rest-client');

const client = Client();

/**
 * 
 * Exposing a method whick will take the request parameters for sending the 
 * notification request to the notification service
 */

module.exports = (subject, content, recepient, requester) => {

    // Create the request body
    let mailBody = {
        subject: subject,
        recepientEmails: recepient,
        content: content,
        requester: requester
    }
    // Prepare the headers

    // Combine headers and req body together


    // Make POST call and handle the response
}