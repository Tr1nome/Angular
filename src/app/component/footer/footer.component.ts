import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private modal: NgbModal) { }

  ngOnInit() {
  }

  callPoliticModal(politic) {
    this.modal.open(politic);
  }

  callMentionsModal(mentions) {
    this.modal.open(mentions);
  }
}
