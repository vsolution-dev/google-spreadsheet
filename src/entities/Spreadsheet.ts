import { Worksheet } from "./Worksheet";
import { GoogleSpreadsheetClient } from "../clients/GoogleSpreadsheetClient";

export class Spreadsheet {

  static async open(client: GoogleSpreadsheetClient) {
    const spreadsheet = new Spreadsheet(client);
    await spreadsheet.load();
    return spreadsheet;
  }

  worksheets: Worksheet[] = [];

  constructor(
    private readonly client: GoogleSpreadsheetClient
  ) {
    this.client = client;
  }

  async load() {
    const { sheets } = await this.client.get({
      fields: 'sheets(properties(title))',
    });

    this.worksheets = sheets.map(async (sheet) => {
      const title = sheet.properties['title'];
      return await Worksheet.open(`'${title}'`, {
        client: this.client,
      })
    });
  }
}
