# Logger
### My Fist programm in Typescript.
---
> A simple Logger for my backend applications. cause i am way too lazy to read winston docs.
> Initial build will add things as i learn more about ts and node in genral.

## Use 
```
//file index.ts
import Logger from "./logger";
const NAMESPACE = "index.ts";
var obj =
'{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';
let log: Logger = new Logger(NAMESPACE);
log.info("Logging in blue", obj);
log.info("Single arguments");
log.success("Logging in green", obj);
log.warn("Logging in blue", obj);
log.error("Logging in red", obj);
log.debug("General log", "Success", obj);
log.info("Hello world");

```
### Output
---
> it also genrates log files in root/logs folder
> output: [09/11/2021 6:46:33 PM] [INFO] [index.ts] Single arguments

