import { Record } from "./Record";
import { GoogleSpreadsheetClient } from "../clients/GoogleSpreadsheetClient";

export class Worksheet {
  readonly title: string;
  readonly client: GoogleSpreadsheetClient;
  records: Record[] = [];
  columns: any[] = [];

  static async open(title: string, { client }) {
    const worksheet = new Worksheet(title, { client });
    await worksheet.load();
    return worksheet;
  }

  constructor(title: string, { client }) {
    this.title = title;
    this.client = client;
  }

  get count() {
    return this.records.length;
  }

  async load() {
    const { values } = await this.client.valuesGet({
      range: this.title
    });

    this.columns = values[0];
    this.records = values.slice(1).map((value: any[], index: number) => {
      return new Record({
        worksheet: this,
        index: index + 2,
        value: this.transform(value),
      })
    })
  }

  transform(value: any[]) {
    return this.columns.reduce((record, column, index) => {
      record[column] = value[index] || null;
      return record;
    }, {});
  }
}
