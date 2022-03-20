import { TestBed } from '@angular/core/testing';

import { NgxCsvParser } from './ngx-csv-parser.service';

describe('NgxCsvParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxCsvParser = TestBed.get(NgxCsvParser);
    expect(service).toBeTruthy();
  });
});
