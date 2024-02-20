const http = require('http');

const serialization = require('../util/serialization');
const id_module = require('../util/id');

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

node['counts'] = 0;

const status = {
  get: function(id, cb= console.log){
    try{
      if(id==='nid'){
        cb(false, id_module.getNID(node));
      }else if (id==='sid'){
        cb(false, id_module.getSID(node));
      }else {
        cb(false, node[id]);
      }
    }catch (e) {
      cb(e);
    }
  }
};

const routes = {
  route_map : {},

  get: function(service_name, cb=console.log){
    try {
      cb(false, this.route_map[service_name]);
    }catch (e) {
      cb(e);
    }
  },

  put: function(service_obj, service_name, cb=console.log){
    try {
      cb(false, this.route_map[service_name] = service_obj);
    }catch (e) {
      cb(e);
    }
  }
};

const comm = {

  send: function(message, remote, cb=console.log){
    try{
      if(!(message instanceof Array)){
        message = [message];
      }
      const putData = serialization.serialize({'remote':remote, 'message':message});

      const options = {
        hostname: remote['node']['ip'],
        port: remote['node']['port'],
        method: 'PUT',
        path: '/routes/get',
        agent: new http.Agent({ keepAlive: true }),
        keepAlive: true,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(putData),
        }
      };

      node['counts']+= 1;
      const req = http.request(options, (res) => {

        let resData = '';
        //res.setEncoding('utf8');
        res.on('data', (chunk) => {
          resData = resData + chunk;
        });
        res.on('end', () => {
          node['counts']+= 1;
          resObj = serialization.deserialize(resData);
          cb(...resObj);
        });

      });
      req.on('error', (e) => {
        cb(e);
      });

      req.write(putData);
      req.end();

    }catch (e) {
      cb(e);
    }
  }

};


const rpcService = {
};

const rpcResolver = {};

routes.put(status, 'status');
routes.put(routes, 'routes');
routes.put(comm, 'comm');
routes.put(rpcService, 'rpcService')
routes.put(rpcResolver, 'rpcResolver');

module.exports = {
  status: status,
  routes: routes,
  comm: comm,
  rpcService: rpcService,
  rpcResolver: rpcResolver,
};
