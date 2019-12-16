import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { GetProductService } from '../../services/get-product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  count: number = 0;
  showHead =true;
  constructor(private productService: GetProductService, private router: Router) {
  	router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/cart') {
          this.showHead = true;
        } else {
          this.showHead = false;
        }
      }
    });

  }

  ngOnInit() {
    this.productService.addProductToCart.subscribe(item => {
        this.count = item.length;
    });
  }

  onKey(event) {
    this.productService.updateData(event.target.value);
  }

}
