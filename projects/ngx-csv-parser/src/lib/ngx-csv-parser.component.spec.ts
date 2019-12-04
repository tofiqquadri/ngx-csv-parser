import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCsvParserComponent } from './ngx-csv-parser.component';

describe('NgxCsvParserComponent', () => {
  let component: NgxCsvParserComponent;
  let fixture: ComponentFixture<NgxCsvParserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCsvParserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCsvParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
