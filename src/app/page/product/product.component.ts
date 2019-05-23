import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { Product } from '../../class/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  color = 'warn';
  diameter = 50;
  public isLoading = false;
  mode = 'indeterminate';
  products: Product[];
  public apiUrl = Globals.APP_API + 'product';
  constructor(private productService: ProductService, private router: Router, private toast: ToastrService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.isLoading = false;
    });
  }
  addProduct(): void {
    this.router.navigate(['add-product']);
  }

  deleteProduct(product: Product) {
    alert('voulez vous vraiment détruire ce produit ?');
    this.productService.deleteProduct(product.id).subscribe(data => {
      console.log(data);
      this.getAllProducts();
      this.showToaster('delete', product);
    });
  }

  updateProduct(product: Product) {
    console.log('produit en cours d\'update');
    localStorage.removeItem('productId');
    localStorage.setItem('productId', product.id);
    this.router.navigate(['update-product']);
    this.showToaster('update', product);
  }

  showToaster(notificationType: string, product: Product) {

    switch (notificationType) {
      case 'delete':
      this.toast.success('Le produit : ' + product.name + ' a été supprimé avec succés !',
       'Fenrir Indique');
      break;
      case 'update':
      this.toast.success('Le produit : ' + product.name + ' a été mis à jour avec succés !');
      break;
    }

  }

}
