import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService) { }

  addForm: FormGroup;
  submitted = false;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.valid) {
      this.productService.addProduct(this.addForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['product']);
      });
    }
  }

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }

}