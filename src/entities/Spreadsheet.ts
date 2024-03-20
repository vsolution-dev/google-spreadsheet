import { Worksheet } from "./Worksheet";
import { GoogleSheetsAPI } from "../clients/GoogleSheetsAPI";

export class Spreadsheet {

  static async open(client: GoogleSheetsAPI) {
    const spreadsheet = new Spreadsheet(client);
    await spreadsheet.load();
    return spreadsheet;
  }

  worksheets: Worksheet[] = [];

  private constructor(
    private readonly client: GoogleSheetsAPI
  ) {
    this.client = client;
  }

  async load() {
    const { sheets } = await this.client.get({
      fields: 'sheets(properties(title))',
    });

    this.worksheets = sheets.map(async (sheet) => {
      const title = sheet.properties['title'];
      return await Worksheet.open(title, {
        client: this.client,
      })
    });
  }
}
