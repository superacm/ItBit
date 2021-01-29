  import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  modalRef!: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  openmodal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }

}
