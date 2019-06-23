'use strict';
const uuid=require('uuid');

const queue = require('../../queue/queue-service');
const status = require('../../status/cache');

function alignRequest(req, res) {
  const request = req.swagger.params.request.value;
  console.log(`Received request`, request);
  const sequence = request.sequence;
  const taskId = uuid.v4();
  const task = {
    taskId,
    sequence
  };
  queue.enqueue(task);
  status[taskId] = {
    sequence,
    taskId,
    status: 'Queued'
  }
  const href = `/api/v1/status/${taskId}`;
  const response = {
    sequence,
    taskId,
    href
  };
  res.location(href);
  res.status(202).json(response);
}

module.exports = {
  alignRequest
};