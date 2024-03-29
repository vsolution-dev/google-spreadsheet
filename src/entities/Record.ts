import { columnToLetter } from "../functions/columnToLetter";
import { Worksheet } from "./Worksheet";

export class Record {
  private readonly worksheet: Worksheet;
  private readonly index: number;
  private readonly value: any;

  constructor({ worksheet, index, value }) {
    this.worksheet = worksheet;
    this.index = index;
    this.value = value;

    for (const column in this.value) {
      Object.defineProperty(this, column, {
        get: () => this.get(column),
        set: (value) => this.set(column, value),
      });
    }
  }

  get(column: string) {
    return this.value[column];
  }

  set(column: string, value: any) {
    if (this.value[column] !== value) {
      this.value[column] = value;
    }
  }

  get a1Range() {
    return this.worksheet.title
        + `!A${this.index}`
        + ':' + columnToLetter(this.worksheet.columns.length) + this.index;
  }

  async update() {
    await this.worksheet.client.valuesUpdate({
      range: this.a1Range,
      values: [
        this.toArray()
      ]
    });

    return true;
  }

  toArray() {
    return this.worksheet.columns.map((column) => {
      return this.value[column];
    });
  }
}
