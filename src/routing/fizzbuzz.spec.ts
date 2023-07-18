import * as Koa from "koa";
import { registerFizzbuzz } from "./fizzbuzz";
import {
  FizzBuzzErrors,
  FizzbuzzRequest,
  FizzbuzzResponse,
} from "../models/fizzbuzz";
import { Either } from "../models/either";
import * as request from "supertest";
import { StatusCodes } from "http-status-codes";

describe("test fizzbuzz endpoint", () => {
  describe("post", () => {
    it("200", async () => {
      const api = new Koa();
      const input: FizzbuzzRequest = {
        int1: 3,
        int2: 5,
        str1: "fizz",
        str2: "buzz",
        limit: 10,
      };
      const expected: FizzbuzzResponse = {
        result: [],
      };

      const mockFizz = (
        input: FizzbuzzRequest,
      ): Either<FizzbuzzResponse, FizzBuzzErrors> => {
        if (input === input) {
          return { value: expected };
        }

        return {
          error: "limit is too great",
        };
      };

      registerFizzbuzz(api, mockFizz);

      const res = await request(api.callback())
        .post("/fizzbuzz")
        .send(input)
        .expect(StatusCodes.OK);
      expect(res.body as FizzbuzzResponse).toStrictEqual(expected);
    });

    it("500", async () => {
      const api = new Koa();
      const input: FizzbuzzRequest = {
        int1: 3,
        int2: 5,
        str1: "fizz",
        str2: "buzz",
        limit: 10,
      };

      const mockFizz = (
        input: FizzbuzzRequest,
      ): Either<FizzbuzzResponse, FizzBuzzErrors> => {
        return {
          error: "limit is too great",
        };
      };

      registerFizzbuzz(api, mockFizz);

      const res = await request(api.callback())
        .post("/fizzbuzz")
        .send(input)
        .expect(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
