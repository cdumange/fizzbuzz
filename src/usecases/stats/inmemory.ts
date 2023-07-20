import { FizzBuzz, Stats, Either, makeError, makeValue } from "../../models";
import { StatManager } from "./common";

export class InMemoryStatManager implements StatManager {
  private stats: Map<FizzBuzz.FizzbuzzRequest, Stats.RequestStat>;
  private max: number = 0;
  private maxRequest?: FizzBuzz.FizzbuzzRequest;

  constructor() {
    this.stats = new Map();
  }

  public Increment(request: FizzBuzz.FizzbuzzRequest): Promise<void> {
    let s = this.stats.get(request);
    if (s === undefined) {
      s = {
        request: request,
        count: 0,
      };
    }

    s.count++;

    if (s.count > this.max) {
      this.max = s.count;
      this.maxRequest = s.request;
    }

    this.stats.set(request, s);

    return new Promise((resolve) => {
      resolve(null);
    });
  }

  public GetStat(
    request: FizzBuzz.FizzbuzzRequest,
  ): Promise<Either<Stats.RequestStat, Stats.ErrGetMostUsed>> {
    return new Promise((resolve) => {
      const s = this.stats.get(request);

      if (s === undefined) {
        resolve(makeError("no stat set"));
        return;
      }

      resolve(makeValue(JSON.parse(JSON.stringify(s))));
    });
  }

  public GetMostUsed(): Promise<
    Either<Stats.RequestStat, Stats.ErrGetMostUsed>
  > {
    return new Promise<Either<Stats.RequestStat, Stats.ErrGetMostUsed>>(
      (resolve) => {
        if (this.max == 0 || this.maxRequest === undefined) {
          resolve(makeError("no stat set"));
          return;
        }

        const stat = this.stats.get(this.maxRequest);
        resolve(makeValue(JSON.parse(JSON.stringify(stat))));
      },
    );
  }
}
