import * as Koa from 'koa';
import * as Router from 'koa-router';

import {Either, isError} from "../models/either"
import { FizzbuzzRequest, FizzbuzzResponse, FizzBuzzErrors} from "../models/fizzbuzz"

import * as HttpStatus from 'http-status-codes';

type functionFizzbuzz = (input: FizzbuzzRequest) => Either<FizzbuzzResponse, FizzBuzzErrors>

export function registerFizzbuzz(api : Koa, fizzbuzz: functionFizzbuzz) {
    const router: Router = new Router({
        prefix: '/fizzbuzz',
    });

    router.get('/', async (ctx: Koa.Context) : Promise<void> => {
        ctx.body = 'it works!'
    })

    router.post('/', async (ctx: Koa.Context) : Promise<void> => {
        const request = ctx.request.body as FizzbuzzRequest
        console.log("body value", request)
        const resp = fizzbuzz(request)

        if (isError(resp)) {
            ctx.response.status = HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR
            console.log(resp.error)
            return
        }

        ctx.response.status = HttpStatus.StatusCodes.OK
        ctx.response.body = resp.value
    })

    api.use(router.routes())
    api.use(router.allowedMethods())
}