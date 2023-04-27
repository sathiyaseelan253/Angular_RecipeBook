import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() message : string
  @Output() closePopupEvent = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }
  onClosePopup(){
    this.closePopupEvent.emit();
  }
}
