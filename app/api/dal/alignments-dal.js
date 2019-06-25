// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'us-east-1' });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

async function getAll() {
  var params = {
    // ExpressionAttributeValues: {
    //   ':s': {N: '2'},
    //   ':e' : {N: '09'},
    //   ':topic' : {S: 'PHRASE'}
    // },
    //KeyConditionExpression: ' = :s and Episode > :e',
    //ProjectionExpression: 'id, sequence, proteinName, proteinPosition',
    //FilterExpression: 'contains (Subtitle, :topic)',
    TableName: 'Alignments'
  };

  try {
    data = await ddb.scan(params).promise();
    console.log("Success | Retrieved count", data.Items.length);
    return data.Items.map(item => {
      return {
        date: item.date.S,
        time: item.time.S,
        taskId: item.taskId.S,
        sequence: item.sequence.S,
        proteinName: item.proteinName.S,
        proteinPosition: item.proteinPosition.N
      };
    });
  } catch (err) {
    console.log("Error", err);
    return [];
  }
}

module.exports = {
  getAll
}