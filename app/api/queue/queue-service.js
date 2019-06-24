var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const config = require('../config');

const queue=[];

class QueueService
{
    constructor() {
    }

    enqueue(task) {
        queue.push(task);
        this.sqsSend(task);
    }

    dequeue() {
        if (queue.length > 0) {
            return queue.shift();
        }
        return null;
    }

    sqsSend(message) {
        const json=JSON.stringify(message);
        console.log(`Sending message to queue ${config.sqsQueue} | ${json}`);
        var params = {
            MessageBody: json,
            QueueUrl: config.sqsQueue,
          };
          sqs.sendMessage(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
          });        
    }
}

module.exports = new QueueService();