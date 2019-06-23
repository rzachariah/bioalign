'use strict';
const uuid=require('uuid');

const queue = require('../../queue/queue-service');
const statusCache = require('../../status/cache');

const db = [{
  id: 1,
  sequence: 'AATTCAG',
  proteinName: 'Actin',
  proteinPosition: 27
}, {
  id: 2,
  sequence: 'AACCCAG',
  proteinName: 'Collagen',
  proteinPosition: 41
}, {
  id: 3,
  sequence: 'TTCCCAG',
  proteinName: 'Elastin',
  proteinPosition: 19
}];

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
  const taskStatus = {
    sequence,
    taskId,
    status: 'Queued'
  };
  statusCache[taskId] = taskStatus;
  const href = `/api/v1/tasks/${taskId}`;
  res.location(href);
  res.status(202).json(taskStatus);
}

function getAlignment(req, res) {
  const id = req.swagger.params.id.value;
  console.log(`Received alignment query`, id);
  const sample = db.find(item => item.id === id);
  if (sample) {
    res.status(200).json(sample);
  } else {
    res.status(404).json("Not found");
  }
}

function getAlignments(req, res) {
  console.log('Received alignment mass query');
  const response = {
    count: db.length,
    items: [db]
  }
  res.status(200).json(response);
}

module.exports = {
  requestAlignment,
  getAlignment,
  getAlignments
};