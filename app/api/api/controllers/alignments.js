'use strict';
const uuid=require('uuid');

const queue = require('../../queue/queue-service');
const status = require('../../status/cache');

function requestAlignment(req, res) {
  const request = req.swagger.params.request.value;
  console.log(`Received alignment request`, request);
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
  const href = `/api/v1/tasks/${taskId}`;
  const response = {
    sequence,
    taskId,
    href
  };
  res.location(href);
  res.status(202).json(response);
}

function getAlignment(req, res) {
  const id = req.swagger.params.id.value;
  console.log(`Received alignment query`, id);
  const response = {
    id,
    sequence: 'AATTCAG',
    proteinName: 'AwesomeProtein',
    proteinPosition: 27
  };
  res.status(200).json(response);
}

module.exports = {
  requestAlignment,
  getAlignment
};