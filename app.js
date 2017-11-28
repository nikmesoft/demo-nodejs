"use strict";

require('enum').register();

var winston = require('winston'),
    express = require('express'),
    cors = require('cors'),
    expressValidator = require('express-validator'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    sticky = require('sticky-session'),
    http = require('http'),
    APIHelper = require('./helpers/api.js'),
    messages = require('./configs/messages'),
    config = require('./configs/config'),
    apiHelper = new APIHelper(),
    cluster = require('cluster');

var DemoApp = function () {
    var self = this;
    self.setupVariables = function () {
        self.port = config.serverPort;
    };

    self.terminator = function (sig) {
        if (typeof sig === "string") {
            winston.error('%s: Received %s - terminating DemoApp app ...',
                Date(Date.now()), sig);
            process.exit(1);
        }
        winston.error('%s: Node server stopped.', Date.now());
    };

    self.setupTerminationHandlers = function () {
        //  Process on exit and signals.
        process.on('exit', function () {
            self.terminator();
        });
        // uncaughtException
        process.on('uncaughtException', function (error) {
            winston.error(error);
        });
    };

    self.initializeServer = function () {
        self.app = express();
        self.app.set('views', path.join(__dirname, 'views'));
        self.app.set('view engine', "jade");
        self.app.engine('jade', require('jade').__express);
        self.app.use(cors());
        self.app.use(bodyParser.json());
        self.app.use(expressValidator());
        self.app.use(bodyParser.urlencoded({ extended: false }));
        self.app.use(cookieParser());
        self.app.use(express.static(path.join(__dirname, 'public')));

        self.app.use(require('./controllers'));
        self.app.use(function (req, res) {
            apiHelper.returnError(res, messages.errors.methodNotFound);
        });

        self.http = http.Server(self.app);

    };

    self.initializeQueueWorkers = function () {
        if (cluster.isMaster) {
            var clusterWorkerSize = require('os').cpus().length;
            for (var i = 0; i < clusterWorkerSize; i++) {
                cluster.fork();
            }
        }
        if (cluster.isWorker) {

        }
    };

    self.initialize = function () {
        self.setupVariables();
        self.setupTerminationHandlers();
        self.initializeServer();
        self.initializeQueueWorkers();
    };

    self.start = function () {
        if (!sticky.listen(self.http, self.port)) {
            self.http.once('listening', function () {
                winston.info('server started on ' + self.port + ' port');
            });
        }
    };
};

var app = module.exports = new DemoApp();
app.initialize();
app.start();
