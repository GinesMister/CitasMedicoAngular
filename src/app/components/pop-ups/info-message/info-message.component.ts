import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.scss']
})
export class InfoMessageComponent implements OnInit {
  
  @Input() message = 'Mensaje predeterminado'
  @Input() time = 3000
  isVisible = true

  ngOnInit() {
    setTimeout(() => {
      this.closePopup()
    }, this.time)
  }

  closePopup() {
    this.isVisible = false
  }
}
