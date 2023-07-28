import { Knex } from "knex";
import { Migration } from "./migrations";
import { RequestStat } from "../models/Stats";

export class FizzStats implements Migration {
  private db: Knex;
  public static readonly TableName = "fizz_stats";

  constructor(db: Knex) {
    this.db = db;
  }

  async Migrate() {
    if (!(await this.db.schema.hasTable(FizzStats.TableName))) {
      await this.db.schema.createTable(FizzStats.TableName, (table) => {
        table.string("request").primary();
        table.integer("count");
      });
    }
  }

  async UpsertRequest(stat: RequestStat) {
    await this.db.raw(
      `INSERT INTO ${FizzStats.TableName} (request, count)
      VALUES (:request, :count)
      ON CONFLICT(request)
      DO UPDATE
      SET count = ${FizzStats.TableName}.count + :count;`,
      { request: JSON.stringify(stat.request), count: stat.count },
    );
  }
}
