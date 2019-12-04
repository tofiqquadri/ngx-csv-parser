import { NgModule } from '@angular/core';
import { NgxCsvParserComponent } from './ngx-csv-parser.component';
import { NgxCsvParser } from './ngx-csv-parser.service';

@NgModule({
  declarations: [NgxCsvParserComponent],
  imports: [
  ],
  providers: [NgxCsvParser],
  exports: [NgxCsvParserComponent]
})
export class NgxCsvParserModule { }
