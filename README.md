# M2: Actors and Remote Procedure Calls (RPC)
> Full name: `Subham Kumar Das`
> Email:  `subham_kumar_das@brown.edu`
> Username:  `sdas52`

## Summary
> Summarize your implementation, including key challenges you encountered

My implementation comprises `3` software components, totaling `250 (approx)` lines of code. Key challenges included `1> During the testing of comm : routes.get(), inorder to get the service object from another node, i was facing issue with deserialization. I figured out that the format i was using for service object was not properly supported by the deserialization code given to us, so i changed the format and voila, test case passed.`.

## Correctness & Performance Characterization
> Describe how you characterized the correctness and performance of your implementation

*Correctness*: I wrote `6` tests; these tests take `0m2.061s` to execute. 

*Performance*: Evaluating RPC performance using [high-resolution timers](https://nodejs.org/api/perf_hooks.html) by sending 1000 service requests in a tght loop results in an average throughput of `2004.89` requests per second and an average latency of `0.48` ms.

## Key Feature
> How would you explain your implementation of `createRPC` to your grandparents (assuming your grandparents are not computer scientists...), i.e., with the minimum jargon possible?

I would tell my grandpa that : Since you always forget to call your son to send you money. I am going to write instructions on a piece of paper for you (which would have the contact details of your son), so that you can follow the instructions and call your son to ask/remind him to send the money to your account.

## Time to Complete
> Roughly, how many hours did this milestone take you to complete?

Hours: `48 hrs`
