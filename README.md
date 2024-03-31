## @vsolution-dev/google-spreadsheet
A brief description of what this project does and who it's for.

## Description
This project utilizes the @vsolution-dev/google-spreadsheet npm package to interact with Google Sheets through the Google Sheets API. It allows for easy manipulation of spreadsheet data programmatically, enabling operations such as reading, updating, and managing records in a Google Sheets document.

## Installation
To get started, you'll first need to install the @vsolution-dev/google-spreadsheet package via npm. Run the following command in your project directory:

```shell
npm install @vsolution-dev/google-spreadsheet
```

## Setup
Before you can start using the package, you need to set up authentication with Google Cloud. Follow these steps:

- Go to the [Google Cloud Console.](https://console.cloud.google.com/)
- Create a new project or select an existing one.
- Enable the Google Sheets API for your project.
- Create a service account and download its credentials as a JSON file.
- Save the service account email and private key as environment variables in your project, typically in a `.env` file:
```
GOOGLE_CLOUD_PRIVATE_EMAIL=your_service_account_email_here
GOOGLE_CLOUD_PRIVATE_KEY=your_private_key_here
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
```
- Ensure you replace your_service_account_email_here, your_private_key_here, and your_spreadsheet_id_here with your actual service account email, private key, and the ID of your Google Spreadsheet.

## Basic Usage

Below is a basic example of how to use this package to open a worksheet, read a record, update a column value, and save the changes back to Google Sheets.

```javascript
import { Worksheet, GoogleSheetsAPI } from "@vsolution-dev/google-spreadsheet";

// Create a GoogleSheetsAPI client
const client = GoogleSheetsAPI.create({
spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
email: process.env.GOOGLE_CLOUD_PRIVATE_EMAIL,
key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
});

// Open a worksheet
const worksheet = await Worksheet.open("Sheet 1", { client });

// Access a record
const record = worksheet.records[0];
record['Column'] = 'New Value';

// Update the record
await record.update();
```

Replace "Sheet 1" with the actual name of your worksheet and 'Column' with the actual column name where you want to update the value to 'New Value'.

## Contributing
Contributions are always welcome! Please adhere to this project's code of conduct.

## License
MIT

Feel free to adjust the sections to fit the specifics of your project, including adding more details about the package capabilities, advanced usage examples, and any other relevant information.
