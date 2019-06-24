'use strict';

const statusCache = require('../../status/cache');
const tasksDal=require('../../dal/tasks-dal');

async function requestStatus(req, res) {
  const taskId = req.swagger.params.taskId.value;
  const taskStatus = await tasksDal.get(taskId);
  if (taskStatus) {
    res.json(taskStatus);
  } else {
    res.status(404).json('Not found');
  }
}

module.exports = {
  requestStatus
};