import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  receiptId: string|undefined;

  constructor(
    private variablesService: SharedVariablesService,
    private receiptService: ReceiptService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isAuth = this.variablesService.isAuth;
    variablesService.isAuthChanged.subscribe((newValue: boolean) => {
      this.isAuth = newValue;
    });
  }

  ngOnInit(): void {

    //console.log(this.route.snapshot.url.join('/'));
    this.route.queryParams.subscribe((info)=>{
      if(this.route.snapshot.url.join('/') === "receipts/delete"){
        this.receiptId = JSON.parse(info['data']);
        this.ngDeleteReceipt(this.receiptId);
      }
    })
    
    if (this.isAuth) {
      this.receiptService.getReceiptByUserId(this.variablesService.userId)
        .subscribe({
          next: (receipts) => {
            this.receipts = receipts;
            //console.log(this.receipts);
            this.total = this.receipts.length;
          },
          error: (console.log),
          complete: (console.log)
        });
    }
  }

  ngDeleteReceipt(receiptId: string| undefined): void{
    if(this.isAuth && confirm("Do you really want to delete this Item?")){
      this.receiptService.deleteReceipt(receiptId).subscribe(
        (answer) =>{
          //console.log(answer);
          this.router.navigate(['receipts'])
        },
        (error) => {
          console.log(error);
        });
      }
  }
}
