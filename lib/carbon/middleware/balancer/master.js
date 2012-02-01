/*!
 * Carbon - balancer middleware
 * Copyright (c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var Drip = require('drip')
  , util = require('util')
  , os = require('os')
  , env = process.env.NODE_ENV
  , debug = require('debug')('carbon-balancer:master')
  , Worker = require('./worker');

/*!
 * Main exports
 */

exports = module.exports = Master;

/**
 * Master (constructor)
 *
 * The master object watches over all of the works
 * and will restart them if need.
 *
 * @param {Server} node http compatible server (connect, express)
 * @param {Options} options
 */

function Master (server, options) {
  Drip.call(this, { delimeter: ' ' });
  options = options || {};
  this.server = server;
  this.workers = [];
  this.maxWorkers = options.maxWorkers || os.cpus().length
  this.host = options.host || 'localhost';
  this.port = options.port;
  this.lastWorker = 0;
}

/**
 * Master is an event emitter
 */

util.inherits(Master, Drip);

/**
 * spawnWorker
 *
 * Spawns a new worker for the provided server
 *
 */

Master.prototype.spawnWorker = function (cb) {
  var worker = new Worker();
  worker.spawn(function (err)  {
    cb();
  })
};

/**
 * getNextWorker
 *
 * returns the necissary information to proxy a request
 * to the next worker in line
 *
 */

Master.prototype.getNextWorker = function () {
  var port = 6789;
  return port;
}