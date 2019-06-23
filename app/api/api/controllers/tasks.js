'use strict';

const statusCache = require('../../status/cache');

function requestStatus(req, res) {
  const taskId = req.swagger.params.taskId.value;
  const status = statusCache[taskId];
  if (status) {
    res.json(status);
  } else {
    res.status(404).json('Not found');
  }
}

module.exports = {
  requestStatus
};