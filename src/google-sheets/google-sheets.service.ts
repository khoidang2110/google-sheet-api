import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GoogleSheetsService {
  private sheets;
  private SPREADSHEET_ID = '1SA-l7lm9a-FLpHANIvPUOayOWLekRk5AXUKYDktkyrQ'; // Thay bằng ID của Google Sheet
  private SHEET_NAME = 'Sheet1'; // Tên sheet cần thao tác

  constructor() {
    const credentials = require('../../config/ggsheet.json'); // Thay bằng đường dẫn tới tệp JSON
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    this.sheets = google.sheets({ version: 'v4', auth });
  }

  // Create
  async addRows(data: any[][]) {
    const response = await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.SPREADSHEET_ID,
      range: `${this.SHEET_NAME}!A1`,
      valueInputOption: 'RAW',
      resource: { values: data },
    });
    return response.data;
  }

  // Read
  async getRows() {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.SPREADSHEET_ID,
      range: `${this.SHEET_NAME}!A1:Z1000`,
    });
    return response.data.values || [];
  }

  // Update
  async updateRow(rowIndex: number, data: any[]) {
    const response = await this.sheets.spreadsheets.values.update({
      spreadsheetId: this.SPREADSHEET_ID,
      range: `${this.SHEET_NAME}!A${rowIndex}`,
      valueInputOption: 'RAW',
      resource: { values: [data] },
    });
    return response.data;
  }

  // Delete
  async deleteRow(rowIndex: number) {
    const emptyData = Array(10).fill(''); // Xóa 10 cột
    const response = await this.sheets.spreadsheets.values.update({
      spreadsheetId: this.SPREADSHEET_ID,
      range: `${this.SHEET_NAME}!A${rowIndex}`,
      valueInputOption: 'RAW',
      resource: { values: [emptyData] },
    });
    return response.data;
  }
}
