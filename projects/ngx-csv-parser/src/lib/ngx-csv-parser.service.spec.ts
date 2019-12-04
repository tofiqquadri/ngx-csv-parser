import { TestBed } from '@angular/core/testing';

import { NgxCsvParserService } from './ngx-csv-parser.service';

describe('NgxCsvParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxCsvParserService = TestBed.get(NgxCsvParserService);
    expect(service).toBeTruthy();
  });
});
