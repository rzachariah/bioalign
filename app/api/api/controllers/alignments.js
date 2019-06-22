'use strict';
const uuid=require('uuid');

function alignRequest(req, res) {
  const request = req.swagger.params.request.value;
  console.log(`Received request`, request);
  const taskId = uuid.v4();
  const href = `/api/tasks/${taskId}`;
  const response = {
    taskId,
    href
  };
  res.location('/tasks/' + taskId);
  res.status(202).json(response);
}

module.exports = {
  alignRequest
};