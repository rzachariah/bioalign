'use strict';

function checkHealth(req, res) {
  res.status(200).json('OK');
}

module.exports = {
  checkHealth
};