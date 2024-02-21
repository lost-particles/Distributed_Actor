let distribution;
let local;

let routes;
let comm;

let id;
let node;

let lastPort = 8095;

beforeEach(() => {
  jest.resetModules();

  global.config = {
    ip: '127.0.0.1',
    port: lastPort++, // Avoid port conflicts
  };

  distribution = require('../distribution');
  local = distribution.local;

  status = local.status;
  routes = local.routes;
  comm = local.comm;
  rpcService = local.rpcService;
  rpcResolver = local.rpcResolver;

  id = distribution.util.id;
  wire = distribution.util.wire;

  node = global.config;
});

test('(5 pt) routes.get(rpcService)', (done) => {
  routes.get('rpcService', (e, v) => {
    expect(e).toBeFalsy();
    expect(v).toBe(rpcService);
    done();
  });
});

test('(1 pt) routes.get(rpcResolver)', (done) => {
  routes.get('rpcResolver', (e, v) => {
    expect(e).toBeFalsy();
    expect(v).toBe(rpcResolver);
    done();
  });
});

test('(5 pts) comm: status.get(sid)', (done) => {
  remote = {node: node, service: 'status', method: 'get'};
  message = [
    'sid', // configuration
  ];

  distribution.node.start((server) => {
    comm.send(message, remote, (e, v) => {
      server.close();
      expect(e).toBeFalsy();
      expect(v).toBe(id.getSID(node));
      done();
    });
  });
});

test('(5 pts) comm: routes.get(comm)', (done) => {
  remote = {node: node, service: 'routes', method: 'get'};
  message = [
    'comm', // configuration
  ];

  distribution.node.start((server) => {
    comm.send(message, remote, (e, v) => {
      server.close();
      expect(e).toBeFalsy();
      expect(v).toBe(comm);
      done();
    });
  });
});

test('(5 pts) Nested Method RPC', (done) => {
  let n = 0;

  const addOne = () => {
    return ++n;
  };

  const addTwo = () => {
    n+=2;
    return n;
  };

  const addAll = () => {
    addOne();
    addTwo();
    return n;
  };

  const addAllRPC = distribution.util.wire.createRPC(
      distribution.util.wire.toAsync(addAll()));

  const rpcService = {
    addAllRPC: addAllRPC,
  };

  distribution.node.start((server) => {
    routes.put(rpcService, 'rpcService', (e, v) => {
      routes.get('rpcService', (e, s) => {
        expect(e).toBeFalsy();
        s.addAllRPC((e, v) => {
          s.addAllRPC((e, v) => {
            s.addAllRPC((e, v) => {
              server.close();
              expect(e).toBeFalsy();
              expect(v).toBe(9);
              done();
            });
          });
        });
      });
    });
  });
});

// test('(5 pts) comm: status.get(rpcService)', (done) => {
//   remote = {node: node, service: 'routes', method: 'get'};
//   message = [
//     'rpcService', // configuration
//   ];
//
//   distribution.node.start((server) => {
//     comm.send(message, remote, (e, v) => {
//       server.close();
//       expect(e).toBeFalsy();
//       expect(v).toBe(rpcService);
//       done();
//     });
//   });
// });

test('(0 pts) sample test', () => {
  const t = true;
  expect(t).toBe(true);
});

// test('(5 pts) comm: routes.get(routes)', (done) => {
//   remote = {node: node, service: 'routes', method: 'get'};
//   message = [
//     'routes', // configuration
//   ];
//
//   distribution.node.start((server) => {
//     comm.send(message, remote, (e, v) => {
//       server.close();
//       expect(e).toBeFalsy();
//       expect(v).toBe(routes);
//       done();
//     });
//   });
// });


test('(0 pts) sample test', () => {
  const t = true;
  expect(t).toBe(true);
});
