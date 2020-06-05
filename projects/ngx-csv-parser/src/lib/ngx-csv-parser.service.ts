import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { NgxCSVParserError } from './_model/ngx-csv-parser-error.interface';

@Injectable({
  providedIn: 'root'
})
export class NgxCsvParser {

  constructor() { 
    console.log(`
      *****************************************************
      ***      For Custom Software/Web development      ***
      *** Reach out to us at contact@developershive.com ***
      ***     Visit us at https://developershive.com    ***
      *****************************************************
    `);    
  }

  private defaultCSVParserConfig = {
    header: true,
    delimiter: ','
  };

  parse(csvFile: File, config: CSVParserConfig): Observable<Array<any>> {

    config = {
      ...this.defaultCSVParserConfig,
      ...config
    };

    const ngxCSVParserObserver = Observable.create((observer: Observer<Array<any> | NgxCSVParserError>) => {
      try {

        let csvRecords = null;

        if (this.isCSVFile(csvFile)) {

          const reader = new FileReader();
          reader.readAsText(csvFile);

          reader.onload = () => {
            const csvData = reader.result;
            const csvRecordsArray = (csvData as string).trim().split(/\r\n|\n/);

            const headersRow = this.getHeaderArray(csvRecordsArray, config);

            csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length, config);

            observer.next(csvRecords);
            observer.complete();
          };

          reader.onerror = () => {
            this.badCSVDataFormatErrorHandler(observer);
          };

        } else {
          this.notCSVFileErrorHandler(observer);
        }

      } catch (error) {
        this.unknownCSVParserErrorHandler(observer);
      }
    });

    return ngxCSVParserObserver;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any, config: any) {
    const dataArr = [];
    const headersArray = (csvRecordsArray[0] as string).split(config.delimiter);

    const startingRowToParseData = config.header ? 1 : 0;

    for (let i = startingRowToParseData; i < csvRecordsArray.length; i++) {
      const data = (csvRecordsArray[i] as string).split(config.delimiter);

      if (data.length === headerLength && config.header) {

        const csvRecord = {};

        for (let j = 0; j < data.length; j++) {
          csvRecord[headersArray[j]] = data[j].trim();
        }
        dataArr.push(csvRecord);
      } else {
        dataArr.push(data);
      }
    }
    return dataArr;
  }

  isCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any, config: any) {
    const headers = (csvRecordsArr[0] as string).split(config.delimiter);
    const headerArray = [];
    for (const header of headers) {
      headerArray.push(header);
    }
    return headerArray;
  }

  notCSVFileErrorHandler(observer: Observer<any>) {
    const ngcCSVParserError: NgxCSVParserError = new NgxCSVParserError();
    ngcCSVParserError.type = 'NOT_A_CSV_FILE';
    ngcCSVParserError.message = 'Selected file is not a csv File Type';
    ngcCSVParserError.code = 2;
    observer.error(ngcCSVParserError);
  }

  unknownCSVParserErrorHandler(observer: Observer<any>) {
    const ngcCSVParserError: NgxCSVParserError = new NgxCSVParserError();
    ngcCSVParserError.type = 'UNKNOWN_ERROR';
    ngcCSVParserError.message = 'Unknown error. Please refer to official documentation for library usage.';
    ngcCSVParserError.code = 404;
    observer.error(ngcCSVParserError);
  }

  badCSVDataFormatErrorHandler(observer: Observer<any>) {
    const ngcCSVParserError: NgxCSVParserError = new NgxCSVParserError();
    ngcCSVParserError.type = 'BAD_CSV_DATA_FORMAT';
    ngcCSVParserError.message = 'Unable to parse CSV File';
    ngcCSVParserError.code = 1;
    observer.error(ngcCSVParserError);
  }
}

class CSVParserConfig {
  header?: boolean;
  delimiter?: string;

  constructor() { }
}
