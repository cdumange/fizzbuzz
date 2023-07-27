import { Knex } from "knex";
import { Migration } from "./migrations";

export class FizzStats implements Migration {
  private db: Knex;
  public static readonly TableName = "fizz_stats";

  constructor(db: Knex) {
    this.db = db;
  }

  async Migrate() {
    if (!(await this.db.schema.hasTable(FizzStats.TableName))) {
      await this.db.schema.createTable(FizzStats.TableName, (table) => {
        table.increments("id");
        table.string("request");
        table.integer("count");
      });
    }
  }
}
