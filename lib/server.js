var restify = require('restify');

function Server(config, log) {
  var self = this;
  this.name = config.name;
  this.port = config.port;
  this.log = log;
}

Server.prototype.run = function () {
  var self = this;
  var server = this.server = restify.createServer();
  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.dateParser(60));
  server.use(restify.queryParser());
  server.use(restify.jsonp());
  server.use(restify.gzipResponse());
  server.use(restify.bodyParser());
  server.use(restify.requestLogger());

  server.get('/ping', function(req, res, next) {
    res.send({status: 'success', 'message': 'pong'});
    next();
  });

  self.log.info('Starting app');
  server.listen(self.port, function() {
    self.log.info('%s listening at %s', self.name, server.url);
  });

};

Server.prototype.shutdown = function (callback) {
  this.log.info('Shutting down', this.name);
  if (this.server) {
    this.server.close(callback);
  } else {
    callback();
  }
};

module.exports = Server;
