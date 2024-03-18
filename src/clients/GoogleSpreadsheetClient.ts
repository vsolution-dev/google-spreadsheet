import { google } from 'googleapis';

export const createJWT = ({ email, key }) => {
  return new google.auth.JWT(email, undefined,
    key.replace(/\\n/g, '\n'),
    'https://www.googleapis.com/auth/spreadsheets'
  );
}

export class GoogleSpreadsheetClient {

  static create({ spreadsheetId, email, key }) {
    return new GoogleSpreadsheetClient({
      spreadsheetId,
      auth: createJWT({
        email,
        key
      }),
    });
  }

  spreadsheetId: string;
  auth: any;
  sheets: any;

  constructor({ spreadsheetId, auth }) {
    this.auth = auth;
    this.spreadsheetId = spreadsheetId;
    this.sheets = google.sheets({
      version: 'v4',
      auth: auth
    });
  }

  async get({ fields }) {
    const { data } = await this.sheets.spreadsheets.get({
      spreadsheetId: this.spreadsheetId,
      auth: this.auth,
      fields: fields,
    });

    return data;
  }

  async valuesGet({ range }) {
    const { data } = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      auth: this.auth,
      range: range,
    });

    return data;
  }

  async valuesUpdate({ range, values }) {
    await this.sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      auth: this.auth,
      range: range,
      valueInputOption: 'RAW',
      resource: {
        values: values,
      },
    })

    return true;
  }
}
