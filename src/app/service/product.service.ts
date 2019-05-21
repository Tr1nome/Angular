import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../class/product';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  baseurl: string = Globals.APP_API;

  getAllProducts() {
    return this.http.get<Product[]>(this.baseurl + 'product');
  }

  getProductById(id: string) {
    return this.http.get<Product>(this.baseurl + 'product' + '/' + id);
  }

  addProduct(product: Product) {
    return this.http.post(this.baseurl + 'product/new', product);
  }

  deleteProduct(id: string){
    return this.http.delete(this.baseurl + 'product' + '/' + id);
  }

  updateProduct(product: Product) {
    return this.http.put(this.baseurl + 'product' + '/' + product.id, product);
  }
}

