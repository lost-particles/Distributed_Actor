const id = require('./id');

function createRPC(func) {
  let funcHash = id.getID(func);
  distribution.local.rpcResolver[funcHash] = func;
  return function(...args) {
    let remote = {node: global.config, service: 'rpcResolver',
      method: funcHash};
    distribution.local.comm.send(args, remote, args.pop() || console.log);
  };
}

/*
    The toAsync function converts a synchronous function that returns a value
    to one that takes a callback as its last argument and returns the value
    to the callback.
*/
function toAsync(func) {
  return function(...args) {
    const callback = args.pop() || function() {};
    try {
      const result = func(...args);
      callback(null, result);
    } catch (error) {
      callback(error);
    }
  };
}

module.exports = {
  createRPC: createRPC,
  toAsync: toAsync,
};
