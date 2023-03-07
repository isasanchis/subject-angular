import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IProduct } from '../model/IProduct';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // criar BehaviorSubject com valor inicial. Irá retornar o valor inicial ou o valor atual da Subscription; valor não se perde (diferente do Subject)
  // método privado pois não deve ser acessado diretamente fora da classe
  private value = new BehaviorSubject<string>('');

  // Subject de filho para pai funciona pois o pai já está inscrito (subscribe) quando o filho renderiza. O contrário não funciona.
  // se vc não estiver inscrito quando o valor é setado, este valor é perdido.
  private products = new Subject<IProduct[]>();

  constructor() {}

  get addValue(): BehaviorSubject<string> {
    return this.value;
  }

  get addProduct(): Subject<IProduct[]> {
    return this.products;
  }
}
