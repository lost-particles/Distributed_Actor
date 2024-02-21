# M2: Actors and Remote Procedure Calls (RPC)
> Full name: `Subham Kumar Das`
> Email:  `subham_kumar_das@brown.edu`
> Username:  `sdas52`

## Summary
> Summarize your implementation, including key challenges you encountered

My implementation comprises `3` software components, totaling `250 (approx)` lines of code. Key challenges included `1> During the testing of comm : routes.get(), inorder to get the service pobject from another node, i was facing issue with deserialization. I figured out that the format i was using for service object was not properly supported by the deserialization code given to us, so i changed the format and voila, test case passed.`.

## Correctness & Performance Characterization
> Describe how you characterized the correctness and performance of your implementation

*Correctness*: I wrote `<number>` tests; these tests take `<time>` to execute. 

*Performance*: Evaluating RPC performance using [high-resolution timers](https://nodejs.org/api/perf_hooks.html) by sending 1000 service requests in a tght loop results in an average throughput of `<rps>` requests per second and an average latency of `<time>` ms.

## Key Feature
> How would you explain your implementation of `createRPC` to your grandparents (assuming your grandparents are not computer scientists...), i.e., with the minimum jargon possible?

## Time to Complete
> Roughly, how many hours did this milestone take you to complete?

Hours: `48 hrs`
