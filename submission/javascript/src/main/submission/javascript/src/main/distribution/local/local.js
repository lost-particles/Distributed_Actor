const http = require('http');

const serialization = require('../util/serialization');
const idModule = require('../util/id');

const node = global.config;

/*

Service  Description                           Methods
status   statusrmation about the current node  get
routes   A mapping from names to functions     get, put
comm     A message communication interface     send

*/

// let resolve = (req, res) => console.log("request", req);
// let start = (srv) => console.log("running", n1)
// http.createServer(resolve).listen(n1.port, n1.ip, start);

let msgCounts = 0;

const status = {
  get: function(id, cb= console.log) {
    try {
      if (id==='nid') {
        cb(false, idModule.getNID(node));
      } else if (id==='sid') {
        cb(false, idModule.getSID(node));
      } else if (id==='counts') {
        cb(false, msgCounts);
      } else {
        cb(false, node[id]);
      }
    } catch (e) {
      cb(e);
    }
  },
};

const routes = {
  routeMap: {},

  get: function(serviceName, cb=console.log) {
    try {
      cb(false, this.routeMap[serviceName]);
    } catch (e) {
      cb(e);
    }
  },

  put: function(serviceObj, serviceName, cb=console.log) {
    try {
      cb(false, this.routeMap[serviceName] = serviceObj);
    } catch (e) {
      cb(e);
    }
  },
};

const comm = {

  send: function(message, remote, cb=console.log) {
    try {
      if (!(message instanceof Array)) {
        message = [message];
      }
      const putData = serialization.serialize(
          {'remote': remote, 'message': message});

      const options = {
        hostname: remote['node']['ip'],
        port: remote['node']['port'],
        method: 'PUT',
        path: '/routes/get',
        agent: new http.Agent({keepAlive: true}),
        keepAlive: true,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(putData),
        },
      };

      msgCounts+= 1;
      const req = http.request(options, (res) => {
        let resData = '';
        // res.setEncoding('utf8');
        res.on('data', (chunk) => {
          resData = resData + chunk;
        });
        res.on('end', () => {
          msgCounts+= 1;
          resObj = serialization.deserialize(resData);
          cb(...resObj);
        });
      });
      req.on('error', (e) => {
        cb(e);
      });

      req.write(putData);
      req.end();
    } catch (e) {
      cb(e);
    }
  },

};


const rpcService = {
};

const rpcResolver = {};

routes.put(status, 'status');
routes.put(routes, 'routes');
routes.put(comm, 'comm');
routes.put(rpcService, 'rpcService');
routes.put(rpcResolver, 'rpcResolver');

module.exports = {
  status: status,
  routes: routes,
  comm: comm,
  rpcService: rpcService,
  rpcResolver: rpcResolver,
  msgCounts: msgCounts,
};
