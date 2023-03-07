import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/model/IProduct';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-sibling',
  templateUrl: './sibling.component.html',
  styleUrls: ['./sibling.component.css'],
})
export class SiblingComponent implements OnInit, OnDestroy {
  // nova subscription para que o behaviorsubject possa ser "escutado", e assim, pegar seu valor - componente "irmão"
  subscription: Subscription = new Subscription;
  products: IProduct[] = [{
    name: 'iPhone 13',
    price: 300.00,
    description: 'Mobile'
  }];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.subscription = this.sharedService.addValue.subscribe((data: string) => {
      return data;
    }); // retorna Isabella, depois Avril Lavigne
    this.subscription = this.sharedService.addProduct.subscribe((data: IProduct[]) => {
      this.products = data;
      return data; // retorna iPhone 13
    })
    this.setValue();
    this.setProducts();
  }

  setValue() {
    this.sharedService.addValue.next("Avril Lavigne");
  }

  setProducts() {
    this.sharedService.addProduct.next(this.products);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
