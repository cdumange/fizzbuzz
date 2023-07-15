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
