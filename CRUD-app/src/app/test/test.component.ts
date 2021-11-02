import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [NgbModalConfig, NgbModal]

})
export class TestComponent implements OnInit {

  constructor(    
    config: NgbModalConfig, private modalService: NgbModal
    ) {
      config.backdrop = 'static';
      config.keyboard = false;
   }

  ngOnInit(): void {
  }

  open(contentt:any) {
    this.modalService.open(contentt);
  }
}
