import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchItem'
})
export class SearchItemPipe implements PipeTransform {

   transform(value: any, args?: any): any {
    if(!args) {
      return value;
    } else {
      return value.filter( items => {
        return items.category.toLowerCase().startsWith(args)==true;
      })
    }
  }

}
