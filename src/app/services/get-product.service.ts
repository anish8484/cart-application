import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetProductService {

  productUrl = "https://api.myjson.com/bins/qzuzi";

  constructor(private http: HttpClient) { }

  private content = new BehaviorSubject<any>('');
  public shareData = this.content.asObservable();

  private sortData = new BehaviorSubject<any>('');
  public sortShareData = this.sortData.asObservable();
 
  private highToLowPrice = new BehaviorSubject<any>('');
  public sortHighToLow = this.highToLowPrice.asObservable();
  private discount = new BehaviorSubject<any>('');
  public afterDiscount = this.discount.asObservable();
 
  private addProduct = new BehaviorSubject<any>([]);
  public addProductToCart = this.addProduct.asObservable();
  
  private minMaxValue = new BehaviorSubject<any>('');
  public maxValue = this.minMaxValue.asObservable();



  getProduct() {
    return this.http.get(this.productUrl);
  }

  updateData(text) {
    this.content.next(text);
  }

  updateSortData(text) {
    this.sortData.next(text);
  }

  updateSortHighToLow(text) {
    this.highToLowPrice.next(text);
  }

  updateDiscount(text) {
    this.discount.next(text);
  }

  setProductFromCart(product) {
    this.addProduct.next(product);
  }
  getProductFromCart() {
    return this.addProduct;
  }

  getFilterProduct(filterProduct) {
    this.minMaxValue.next(filterProduct);
  }

}
