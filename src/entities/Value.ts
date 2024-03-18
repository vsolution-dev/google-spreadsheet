import { columnToLetter } from "../functions/columnToLetter";
import {Sheet} from "./Sheet";
import {GoogleSpreadsheetClient} from "../clients/GoogleSpreadsheetClient";

export class Value {
  private readonly client: GoogleSpreadsheetClient;
  private readonly sheet: Sheet;
  private index: number = -1;
  private value: any = {};

  constructor({ client, sheet, index, value }) {
    this.client = client;
    this.sheet = sheet;
    this.index = index;
    this.value = value;

    for(const column in this.value) {
      Object.defineProperty(this, column, {
        get: () => this.get(column),
        set: (value) => this.set(column, value),
      });
    }
  }

  get(column) {
    return this.value[column];
  }

  set(column, value) {
    if (this.value[column] !== value) {
      this.value[column] = value;
    }
  }

  get a1Range() {
    return this.sheet.title
        + `!A${this.index}`
        + ':' + columnToLetter(this.sheet.columns.length) + this.index;
  }

  async update() {
    await this.client.valuesUpdate({
      range: this.a1Range,
      values: [
        this.toArray()
      ]
    });

    return true;
  }

  toArray() {
    return this.sheet.columns.map((column) => {
      return this.value[column];
    });
  }
}
