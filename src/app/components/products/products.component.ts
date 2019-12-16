import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { GetProductService } from '../../services/get-product.service';
declare let $: any;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
storeProduct: any = [];
tempNewCartItems: any = [];
searchProduct: any;
productInPriceRange: any = [];
fetchItem;
value: number= 1;
highValue;
options: Options = {
    floor: 1,
    ceil: 10000
};
selected=false;
sortedProducts: any = [];
sortedHighToLowPrice: any = [];
afterDiscountPrice: any = [];
  constructor( private productService: GetProductService) {
    this.productService.shareData.subscribe(item => {
      this.searchProduct = item;
    });

  }

  ngOnInit() {
  	this.productService.getProduct().subscribe(item => {
      this.storeProduct = item;
      this.sortedProducts = item;
      this.sortedHighToLowPrice = item;
      this.afterDiscountPrice = item;
      this.fetchItem= item;
      this.minMaxRange(item);
    });
    this.productService.getProductFromCart().subscribe(item => {
      this.tempNewCartItems = item;
    });
    this.sortLowToHigh();
    this.sortHighToLow();
    this.priceAfterDiscount();
    this.filterOnMinMaxValue();
  }

  showM(){
    $('#myModal').modal('show');
  }

  filterModal(){
    $('#filterM').modal('show');
  }

  sortLowToHigh () {
    this.productService.sortShareData.subscribe(item => {
      this.storeProduct = item;
    });
  };
  sortHighToLow () {
    this.productService.sortHighToLow.subscribe(item => {
      this.storeProduct = item;
    });
  };
  priceLowToHigh() {
  this.sortedProducts = this.sortedProducts.sort((a: any, b: any) => {
        if (a.price < b.price) {
            return -1;
        }
    });
    this.productService.updateSortData(this.sortedProducts);
  };
  priceHighToLow () {
      this.sortedHighToLowPrice = this.sortedHighToLowPrice.sort((a: any, b: any) => {
        return b.price-a.price
    });

    this.productService.updateSortHighToLow(this.sortedHighToLowPrice);
  };

  discountPrice() {
      this.afterDiscountPrice = this.afterDiscountPrice.sort((a: any, b: any) => {
        if (a.discount < b.discount) {
            return -1;
        }
    });
      this.productService.updateDiscount(this.afterDiscountPrice);
  };
  priceAfterDiscount () {
    this.productService.afterDiscount.subscribe(item => {
      this.storeProduct = item;
    });
  };

  addProductOnCart(item) {
    let tempArray = [];
    if(this.tempNewCartItems.length) {
      tempArray = this.tempNewCartItems;
    }
    tempArray.push(item);
    this.productService.setProductFromCart(tempArray);
  }

  filterOnMinMaxValue() {
    this.productService.maxValue.subscribe(item => {
      this.storeProduct = item;
    });
  }
  minMaxRange(data){
  	let obj=data.reduce(function(prev, curr) {
    	return prev.price < curr.price ? prev : curr;
	});
  	let obj1=data.reduce(function(prev, curr) {
    	return prev.price > curr.price ? prev : curr;
	});
	this.value=obj.price;
	this.highValue=obj1.price;
	const newOptions: Options = Object.assign({}, this.options);
    newOptions.ceil = obj1.price;
    newOptions.floor=obj.price;
    this.options = newOptions;
  }
  updatedMinMaxValue() {
     this.productInPriceRange = []
     let minValue = this.value;
     let maxValue = this.highValue;
     for(let i=0; i<this.fetchItem.length; i++) {
       if(this.fetchItem[i].price >= minValue  && this.fetchItem[i].price <=maxValue) {
        	this.productInPriceRange.push(this.fetchItem[i]);
       }
     }

     this.productService.getFilterProduct(this.productInPriceRange);

  }

}
