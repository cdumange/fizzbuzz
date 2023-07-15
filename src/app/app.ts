import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser'

import { registerFizzbuzz } from "../routing/fizzbuzz"
import { FizzBuzz } from "../usecases/fizzbuzz"


const app:Koa = new Koa();
app.use(bodyParser())

registerFizzbuzz(app, FizzBuzz)

app.on('error', console.error);

export default app;