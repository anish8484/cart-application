import { Component, OnInit } from '@angular/core';
import { GetProductService } from '../../services/get-product.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  storeProduct: any = [];
  counter: number = 1;
  selectedProduct: any = [];
  actualAmount = 0;
  discountAmount = 0;
  totalAmount = 0;
  num;
  constructor(private productService: GetProductService) { }

  ngOnInit() {
  	this.addProductToCart();
    this.calculateFinalAmount();
  }

  addProductToCart() {    
    this.productService.addProductToCart.subscribe(item => {
      for(var i = 0; i<item.length; i++) {
        if(item[i].counter == undefined) {
          item[i].counter = 1;
        }
      }
      this.selectedProduct = item;
    });
  }
  removeProduct(product) {
    this.selectedProduct.splice(this.selectedProduct.indexOf(product), 1);
    this.calculateFinalAmount();
  }
  minusOne(count, i) {
    if(count > 1) {
      this.selectedProduct[i].counter = count - 1;
    }
    this.calculateFinalAmount();
  }
  addOne(count, i) {    
    //item = item.counter + 1;
    if(count == undefined) {
      count = 1;
    }
    this.selectedProduct[i].counter = count + 1;
    this.calculateFinalAmount();
  }
  valNum(count, i){
  	let inVal=count;
  	if(inVal < 1 || inVal == undefined){
  		this.num=1;
  		this.selectedProduct[i].counter = 1;
  		this.calculateFinalAmount();
  	}

  	else{
  		this.selectedProduct[i].counter = count + 1;
    	this.calculateFinalAmount();
  	}
  }
  calculateFinalAmount() {
    let selectedItem = this.selectedProduct;
    this.actualAmount = 0;
    this.discountAmount = 0;
    this.totalAmount = 0;

    for (let j = 0; j < selectedItem.length; j++) {
      var item = selectedItem[j];
      this.actualAmount = this.actualAmount + Math.floor(item.counter*(item.price*100)/(100-item.discount));
      this.discountAmount = this.discountAmount + (item.counter*(Math.floor(item.counter*(item.price*100)/(100-item.discount))*item.discount/100));
      this.totalAmount = this.totalAmount + (item.counter*item.price);
    }
  }

}
