// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'us-east-1' });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

async function put(task) {
  console.log('Task to write', task);
  var params = {
    Item: {
      "taskId": {
        S: task.taskId
      },
      "sequence": {
        S: task.sequence
      },
      "status": {
        S: task.status
      }
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: "Tasks"
  };
  console.log('Writing to Tasks', params);

  try {
    const response = await ddb.putItem(params).promise();
    console.log("Success", response);
  } catch (err) {
    console.log("Error", err);
  }
}

async function get(taskId) {
  var params = {
    Key: {
      "taskId": {
        S: taskId
      }
    },
    TableName: "Tasks"
  };

  try {
    data = await ddb.getItem(params).promise();
    console.log("Success", data);
    return {
      taskId: data.Item.taskId.S,
      sequence: data.Item.sequence.S,
      status: data.Item.status.S
    };
  } catch (err) {
    console.log("Error", err);
    return null;
  }
}

module.exports = {
  put,
  get
}