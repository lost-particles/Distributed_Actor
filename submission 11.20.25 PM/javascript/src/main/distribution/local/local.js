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
  get(id, cb= console.log){
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
  },
};

const routes = {
  route_map : {},

  get(method_name, cb=console.log){
    try {
      cb(false, this.route_map[method_name]);
    }catch (e) {
      cb(e);
    }
  },

  put(service_obj, service_name, cb=console.log){
    try {
      cb(false, this.route_map[service_name] = service_obj);
    }catch (e) {
      cb(e);
    }
  }
};

const comm = {

};

routes.put(status, 'status');
routes.put(routes, 'routes');
routes.put(comm, 'comm');

module.exports = {
  status: status,
  routes: routes,
  comm: comm,
};
