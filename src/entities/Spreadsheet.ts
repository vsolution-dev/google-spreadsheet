import { Sheet } from "./Sheet";
import {GoogleSpreadsheetClient} from "../clients/GoogleSpreadsheetClient";

export class Spreadsheet {

  static async open(client) {
    const spreadsheet = new Spreadsheet(client);
    await spreadsheet.load();
    return spreadsheet;
  }

  sheets: Sheet[] = [];

  constructor(
    private readonly client: GoogleSpreadsheetClient
  ) {
    this.client = client;
  }

  async load() {
    const { sheets } = await this.client.get({
      fields: 'sheets(properties(title))',
    });

    this.sheets = sheets.map(async (sheet) => {
      const title = sheet.properties['title'];
      return await Sheet.open(`'${title}'`, {
        client: this.client,
      })
    });
  }
}
