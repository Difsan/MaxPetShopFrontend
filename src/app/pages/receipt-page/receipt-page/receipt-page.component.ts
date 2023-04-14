import { Component, OnInit } from '@angular/core';
import { Receipt } from 'src/app/models/receipt.model';
import { ReceiptService } from 'src/app/services/receipt-service/receipt.service';
import { SharedVariablesService } from 'src/app/services/shared-variables-service/shared-variables.service';

@Component({
  selector: 'app-receipt-page',
  templateUrl: './receipt-page.component.html',
  styleUrls: ['./receipt-page.component.css']
})
export class ReceiptPageComponent implements OnInit {

  isAuth: boolean;

  receipts: Receipt[] = [];
  p: number = 0;
  total: number | undefined = this.receipts.length;

  constructor(
    private variablesService: SharedVariablesService,
    private receiptService: ReceiptService
  ) {
    this.isAuth = this.variablesService.isAuth;
    variablesService.isAuthChanged.subscribe((newValue: boolean) => {
      this.isAuth = newValue;
    });
  }

  ngOnInit(): void {
    if (this.isAuth) {
      this.receiptService.getReceiptByUserId(this.variablesService.userId)
        .subscribe({
          next: (receipts) => {
            this.receipts = receipts;
            console.log(this.receipts);
            this.total = this.receipts.length;
          },
          error: (console.log),
          complete: (console.log)
        });

    }
  }
}
