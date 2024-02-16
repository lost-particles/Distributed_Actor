const http = require('http');

const serialization = require('../util/serialization');
const id = require('../util/id');

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
node['nid'] = id.getNID(node);
node['sid'] = node['nid'].substring(0, 5);

const status = {
  get(id, cb){
    try{
      cb(node[id]);
    }catch (e) {
      cb(e);
    }
  },
};

const routes = {
  route_map : {},

  get(method_name, cb){
    try {
      cb(this.route_map[method_name]);
    }catch (e) {
      cb(e);
    }
  },

  put(service_obj, service_name, cb){
    try {
      cb(this.route_map[service_name] = service_obj);
    }catch (e) {
      cb(e);
    }
  }
};

const comm = {

};

module.exports = {
  status: status,
  routes: routes,
};
