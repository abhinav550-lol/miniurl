import dotenv from "dotenv";
dotenv.config();

import memjs from "memjs";

const memClient = memjs.Client.create(process.env.MEMCACHED_URL);

export {memClient};