import { createApp } from "./app.js";
import config from "./config.js";
import { db as defaultDB } from "./db/index.js";

const app = createApp(defaultDB);

app.listen(config.api.port, () => {
    console.log(`The server is listening on PORT: ${config.api.port}`);
});