import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    csvRecords: any[] = [];
    header: boolean = false;

    constructor(private ngxCsvParser: NgxCsvParser) {}

    @ViewChild('fileImportInput') fileImportInput: any;

    fileChangeListener($event: any): void {
        const files = $event.srcElement.files;
        this.header =
            (this.header as unknown as string) === 'true' ||
            this.header === true;

        this.ngxCsvParser
            .parse(files[0], {
                header: this.header,
                delimiter: ',',
                encoding: 'utf8'
            })
            .pipe()
            .subscribe(
                (result: Array<any>) => {
                    console.log('Result', result);
                    this.csvRecords = result;
                },
                (error: NgxCSVParserError) => {
                    console.log('Error', error);
                }
            );
    }
}
