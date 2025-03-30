import { Worker } from 'node:worker_threads';

// SharedStructType takes an array of field names.
let SharedBox = new SharedStructType(["x"]);
let sharedBox = new SharedBox();
sharedBox.x = 42;

let worker = new Worker("./test-1-worker.js");
worker.postMessage({ sharedBox });
let mutex = new Atomics.Mutex;

let i = 0;
while (true)
    // setInterval(() => {
    // Atomics.Mutex.lock(mutex, function runsUnderLock() {
    sharedBox.x = i++;
// });
// }, 0);
