export type FizzbuzzRequest = {
  int1: number;
  int2: number;
  str1: string;
  str2: string;
  limit: number;
};

export type FizzbuzzResponse = {
  result: string[];
};

export type FizzBuzzErrors = "INTs can't be <= 0" | "limit is too great";