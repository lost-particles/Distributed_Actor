#!/bin/node

global.config = global.config || require('./distribution/local/config');

const distribution = {
  util: require('./distribution/util/util.js'),
  local: require('./distribution/local/local.js'),
  node: require('./distribution/local/node.js'),
};

global.distribution = distribution;
module.exports = distribution;

/* The following code is run when distribution.js is run directly */
if (require.main === module) {
  distribution.node.start((server) => {
    /* Code that runs after your node has booted */
    // distribution.local.status.get('sid', console.log);
    // distribution.local.status
    // remote = {node: {
    //     ip: '127.0.0.1',
    //     port: 8080,
    //   }, service: 'routes', method: 'get'};
    // message = [
    //   'status' // configuration
    // ];
    // distribution.local.comm.send(message, remote, console.log)

    // remote = {node: global.config, service: 'routes', method: 'get'};
    // message = ['status'];
    //
    // distribution.local.routes.get('status', (e, v) => {
    //   if (!e) {
    //     try {
    //       statusObj =
    //         distribution.util.deserialize(distribution.util.serialize(v));
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }
    // });
    //
    // distribution.local.comm.send(message, remote, console.log);



    // remote = {node: global.config, service: 'routes', method: 'get'};
    // message = [
    //   'comm', // configuration
    // ];
    //
    // //commObj = distribution.local.routes.get('comm');
    // distribution.local.comm.send(message, remote, (e, v) => {
    //   console.log("Inside student test case routes.get(comm) : "+ distribution.util.serialize(v));
    //   //console.log("Comm serialization : "+ distribution.util.serialize());
    //   server.close();
    //   if(distribution.local.comm===v){
    //     console.log("Match Found");
    //   }else{
    //     console.log("Match not found");
    //   }
    // });



    // RPC Test 2

    let n = 0;

    const addAll = (x) => {
      n+=x;
      return n;
    };

    const addAllRPC = distribution.util.wire.createRPC(
      distribution.util.wire.toAsync(addAll(n)));

    const rpcService = {
      addAllRPC: addAllRPC,
    };

    distribution.local.routes.put(rpcService, 'rpcService', (e, v) => {
      distribution.local.routes.get('rpcService', (e, s) => {
        s.addAllRPC(2, (e, v) => {
          server.close();
        });
      });
    });



    // RPC Test

    // let n = 0;
    //
    // const addOne = () => {
    //   return ++n;
    // };
    //
    // let routes = distribution.local.routes;
    // const addOneRPC = distribution.util.wire.createRPC(
    //   distribution.util.wire.toAsync(addOne));
    //
    // const rpcService = {
    //   addOneRPC: addOneRPC,
    // };
    //
    //   routes.put(rpcService, 'rpcService', (e, v) => {
    //     routes.get('rpcService', (e, s) => {
    //       //expect(e).toBeFalsy();
    //       s.addOneRPC((e, v) => {
    //         s.addOneRPC((e, v) => {
    //           s.addOneRPC((e, v) => {
    //             server.close();
    //             expect(e).toBeFalsy();
    //             expect(v).toBe(3);
    //             done();
    //           });
    //         });
    //       });
    //     });
    //   });
  });
}
