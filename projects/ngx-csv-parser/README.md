# NgxCsvParser

* This is a CSV Parser library which will help you to parse a selected CSV File in your Angular Application. Currently working with Angular version 15.x.x+ as tested along with backward compatibility with previous Angular versions.

* This library is in compliance to RFC 4180

# Examples/Demo

* A simple Example can be found under src/app directory of this repository.

* Simply run `npm i` and then run the application using your preffered command.

# Installation
`npm i ngx-csv-parser`

# API
`import { NgxCsvParserModule } from 'ngx-csv-parser;`

# Usage

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxCsvParserModule } from 'ngx-csv-parser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxCsvParserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

# Configuration

* The library has 3 configuration options.

* header: true or false. This will allow you to make the first row of your CSV file act as the key for the result and the data from the remaining file as the value for those objects.

* Example if the csv data is:

* firstName,lastName
* John,Doe

* In case the header config is true the result will be:

```typescript
[
  {
    firstName: 'John',
    lastName: 'Doe'
  }
]
```
* In case header config is false the result will be:
```typescript
[
    ['firstName', 'lastName'],
    ['John', 'Doe']
]
```

* delimiter: the marking factor which decides which symbol should be used to split the file.
* Default delimiter is: `','`

* encoding: this will define the encoding type to parse the csv file. You can select different encoding types depending on your file.
* Default encoding type is: `'utf8'`

# Use the import NgxCsvParser in your component.

## For ngx-csv-parser version 1.1.0 and above

```typescript
import { Component, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  csvRecords: any;
  header: boolean = false;

  constructor(private ngxCsvParser: NgxCsvParser) {
  }

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',', encoding: 'utf8' })
      .pipe().subscribe({
        next: (result): void => {
          console.log('Result', result);
          this.csvRecords = result;
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        }
      });
  }
}
```

## For ngx-csv-parser version 0.0.7 and below

```typescript
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
  header = false;

  constructor(private ngxCsvParser: NgxCsvParser) {
  }

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {

        console.log('Result', result);
        this.csvRecords = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });

  }
}
```
# Credits

I would like to thank my Friend Akshay Jain for his support and motivation to me at the time of writing this library. Also, I want to thank the entire Angular team for creating this awesome framework.

## Running the example in local env

* `npm i`
* Run `ng serve` for a dev server and running the demo app. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
* Sample CSV File will be provided in the example folder.

## Hiring for Remote Frontend or Full Stack Developer?

* Contact for Premium Software Development/Designing Service: https://tofiqquadri.com

## Services

* For web development and related services visit us at: https://developershive.com
* Mail us at: contact@developershive.com

## Author

* Name: Tofiq Quadri
* Email: tofiqquadri@developershive.com