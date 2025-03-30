import { parentPort } from "node:worker_threads";

let mutex = new Atomics.Mutex;

parentPort.once("message", async (e) => {
    let { sharedBox } = e;
    // `console.log` are async in threads in node.js
    // so 
    let i = 0;
    while (true) {
        // setInterval(() => {
        // Atomics.Mutex.lock(mutex, function runsUnderLock() {
        i++;
        if (i % 1_0 === 0) {
            await makeYield();
        }
        console.log(sharedBox.x)
        // });
        // }, 0);
    }
});

async function makeYield() {
    return new Promise((res) => {
        setTimeout(() => res())
    })
}
