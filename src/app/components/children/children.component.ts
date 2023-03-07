import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/model/IProduct';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
})
export class ChildrenComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription;
  products: IProduct[] = [{
    name: 'iPhone 14',
    price: 400.00,
    description: 'Mobile'
  }]

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.subscription = this.sharedService.addValue.subscribe((data: string) => {
      return data; // retorna Isabella e Avril Lavigne quando vai p/ irmão
    });
    this.setValue();
    this.setProducts();
  }

  // componente que seta o valor e que deve ser acessado pelos demais componentes (pai e irmão, nesse caso)
  // next() seta valor
  setValue(): void {
    this.sharedService.addValue.next('Isabella');
  }

  // Subject de filho para pai funciona pois o pai já está inscrito (subscribe) quando o filho renderiza. O contrário não funciona
  // porém, pode gerar erro NG0100, quando o filho muda o valor depois que pai já foi renderizado - fazer state lift, nesse caso
  setProducts() {
    this.sharedService.addProduct.next(this.products);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
