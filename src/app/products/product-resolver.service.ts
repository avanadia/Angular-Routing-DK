import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { ProductService } from './product.service';
import { IProduct } from './product';

@Injectable()
export class ProductResolver implements Resolve<IProduct> {

    constructor(private productService: ProductService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
        
        let id = route.params['id'];
        // If id is not a number, log error to console and return to product list
        if (isNaN(id)) {
            console.log(`Product id was not a number: ${id}`);
            this.router.navigate(['/products']);
            return Observable.of(null);
        }
        // if it is a number, we get the product with error handling
        return this.productService.getProduct(+id).map(product => {
            if (product) {
                return product;
            }
            // if product does not exist, log error and go back to product list
            console.log(`Product was not found: ${id}`);
            this.router.navigate(['/products']);
            return null;
        }) //now catch any other errors
        .catch(error => {
            console.log(`Retrieval error: ${error}`);
            this.router.navigate(['/products']);
            return Observable.of(null);
        });
    }

}