import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Product } from '../../../class/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  product: Product;
  editForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    let productId = localStorage.getItem('productId');
    if (!productId) {
      alert('Something wrong!');
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      price: ['', Validators.required],
    });

    this.productService.getProductById(productId).subscribe(data => {
      console.log(data);
      this.editForm.patchValue(data);
    });
  }

  get f() { return this.editForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('submit');

    if (this.editForm.valid) {
      this.productService.updateProduct(this.editForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['/product']);
      });
    }
  }

}
