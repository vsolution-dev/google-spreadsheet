import { Value } from "./Value";
import {GoogleSpreadsheetClient} from "../clients/GoogleSpreadsheetClient";

export class Sheet {
  client: GoogleSpreadsheetClient;
  values: Value[] = [];
  columns: any[] = [];
  title: string;

  static async open(title: string, { client }) {
    const sheet = new Sheet(title, { client });
    await sheet.load();
    return sheet;
  }

  constructor(title: string, { client }) {
    this.title = title;
    this.client = client;
  }

  get count() {
    return this.values.length;
  }

  async load() {
    const { values } = await this.client.valuesGet({
      range: this.title
    });

    this.columns = values[0];
    this.values = values.slice(1).map((value: any[], index: number) => {
      return new Value({
        client: this.client,
        index: index + 2,
        sheet: this,
        value: this.transform(value),
      })
    })
  }

  transform(value: any[]) {
    return this.columns.reduce((attributes, column, index) => {
      attributes[column] = value[index] || null;
      return attributes;
    }, {});
  }
}
