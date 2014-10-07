var ThriftClient = require('sz-thrift').ThriftClient;
var util = require('util');
var _ = require('lodash');

var AURA_DEFINED = !_.isUndefined(global.aura);
var AURA_CONFIG_EXISTS = (AURA_DEFINED && _.isPlainObject(aura.config.thrift) && _.isPlainObject(aura.config.thrift.emitir));

var defaultConfig = {
  host: (AURA_CONFIG_EXISTS && aura.config.thrift.emitir.host ? aura.config.thrift.emitir.host : '127.0.0.1'),
  port: (AURA_CONFIG_EXISTS && aura.config.thrift.emitir.port ? aura.config.thrift.emitir.port : 9091)
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