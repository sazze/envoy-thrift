var ThriftClient = require('@sazze/thrift').ThriftClient;
var util = require('util');
var _ = require('lodash');

var defaultConfig = {
  host: '127.0.0.1',
  port: 9091
};

function SendClient(host, port) {
  var config = {host: host, port: port};

  config = _.defaults(config, defaultConfig);

  ThriftClient.apply(this, [config.host, config.port, require('../SendService')]);
}

util.inherits(SendClient, ThriftClient);

module.exports = SendClient;

/**
 *
 * @param {string} request JSON formatted string that represents the request to make
 * @param {function} success
 * @param {function} error
 */
SendClient.prototype.send = function (request, success, error) {
  ThriftClient.prototype.send.call(this, 'send', [request], success, error);
};