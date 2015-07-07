/*jslint node: true */
"use strict";

var bunyan = require('bunyan');
var fs = require('fs');
var log = bunyan.createLogger({name: 'node-skeleton'});

var Server = require('./lib/server');

var config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

var server = new Server(config.server, log);
server.run();

function shutdown() {
  server.shutdown(function(status) {
    process.exit();
  });
}

process.on('SIGHUP', function() {
  shutdown();
});

process.on('SIGTERM', function() {
  shutdown();
});
