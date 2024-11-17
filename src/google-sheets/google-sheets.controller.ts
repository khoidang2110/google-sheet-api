import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';

@Controller('google-sheets')
export class GoogleSheetsController {
  constructor(private readonly googleSheetsService: GoogleSheetsService) {}

  @Post()
  async addRows(@Body('data') data: any[][]) {
    return this.googleSheetsService.addRows(data);
  }

  @Get()
  async getRows() {
    return this.googleSheetsService.getRows();
  }

  @Put(':rowIndex')
  async updateRow(@Param('rowIndex') rowIndex: number, @Body('data') data: any[]) {
    return this.googleSheetsService.updateRow(rowIndex, data);
  }

  @Delete(':rowIndex')
  async deleteRow(@Param('rowIndex') rowIndex: number) {
    return this.googleSheetsService.deleteRow(rowIndex);
  }
}
