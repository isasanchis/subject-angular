import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/model/IProduct';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit, OnDestroy {
  // nova subscription para que o behaviorsubject possa ser "escutado", e assim, pegar seu valor - componente "pai"
  subscription: Subscription = new Subscription;
  products: IProduct[] = [];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.subscription = this.sharedService.addValue.subscribe((data: string) => {
      return data; // retorna Isabella, depois Avril Lavigne
    });
    this.subscription = this.sharedService.addProduct.subscribe((data: IProduct[]) => {
      this.products = data; // retorna iPhone 14 (filho)
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
