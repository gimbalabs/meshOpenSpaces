
import {builder1, builder2} from "./17-03-26/tx-chaining";

await builder1();
const txHash = await builder2()
console.log(txHash)