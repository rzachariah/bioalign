'use strict';
const uuid=require('uuid');

const queue = require('../../queue/queue-service');
const alignmentDal=require('../../dal/alignments-dal');
const tasksDal=require('../../dal/tasks-dal');

async function requestAlignment(req, res) {
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
  await tasksDal.put(taskStatus);
  const href = `/api/v1/tasks/${taskId}`;
  res.location(href);
  res.status(202).json(taskStatus);
}

async function getAlignments(req, res) {
  console.log('Received alignment mass query');
  const items = await alignmentDal.getAll();
  const response = {
    count: items.length,
    items
  }
  res.status(200).json(response);
}

module.exports = {
  requestAlignment,
  getAlignments
};