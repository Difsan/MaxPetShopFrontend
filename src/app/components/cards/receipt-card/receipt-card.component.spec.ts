import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptCardComponent } from './receipt-card.component';

describe('ReceiptCardComponent', () => {
  let component: ReceiptCardComponent;
  let fixture: ComponentFixture<ReceiptCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
