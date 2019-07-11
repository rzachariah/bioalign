// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'us-east-1' });
// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
// Friendlier DynamoDB client
const docClient = new AWS.DynamoDB.DocumentClient();

const moment = require('moment');

async function getAll() {
  var params = {
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

async function getToday() {
  const today = moment.utc().format('YYYY-MM-DD');
  console.log("Getting alignments from today", today);
  var params = {
    TableName: 'Alignments',
    KeyConditionExpression: "#dt = :isodate",
    ExpressionAttributeNames:{
        "#dt": "date"
    },
    ExpressionAttributeValues: {
        ":isodate": today
    }
  };
  console.log('params', params);
  try {
    data = await docClient.query(params).promise();
    console.log("Success | Retrieved count", data.Items.length);
    return data.Items;
  } catch (err) {
    console.log("Error", err);
    return [];
  }
}

module.exports = {
  getAll,
  getToday
}