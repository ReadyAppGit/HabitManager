import { Component, OnInit } from '@angular/core';
import { PopoverController, } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage{

  constructor(public popoverController:PopoverController) { }

  close(iconName) {
    this.popoverController.dismiss(iconName);
  }

}
