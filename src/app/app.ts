import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";

import { registerFizzbuzz } from "../routing/fizzbuzz";
import { FizzBuzz } from "../usecases/fizzbuzz/fizzbuzz";
import { InMemoryStatManager } from "../usecases/stats";
import { registerStats } from "../routing/stats";

const app: Koa = new Koa();
app.use(bodyParser());

const statManager = new InMemoryStatManager();

registerFizzbuzz(app, FizzBuzz, statManager);
registerStats(app, statManager);

app.on("error", console.error);

export default app;
