import { Component, OnInit } from '@angular/core';
import {FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule} from '@angular/forms';
import {ContactService} from '../../service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    contactFailed: boolean;
    contactDone: boolean;
    loading: boolean;
    contactForm: FormGroup;
  constructor(private fb: FormBuilder, private contactService: ContactService) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      mail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(([^<>()\\[\\]\\.,;:\\s@\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$')
    ])),
      message: [null, Validators.required ],
    });
  }

  send() {
    const val = this.contactForm.value;
    this.loading = true;
    this.contactService.send(val).subscribe( (data) => {
        console.log(data);
        this.loading = false;
        this.contactDone = true;
    }, () => {
        this.contactFailed = true;
    });
}

}
