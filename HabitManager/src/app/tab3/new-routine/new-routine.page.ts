import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DatabaseService } from '../../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-routine',
  templateUrl: './new-routine.page.html',
  styleUrls: ['./new-routine.page.scss'],
})
export class NewRoutinePage{

  private text;
  private hour;
  private day;

  constructor(
    public navCtrl:NavController,
    public servicio: DatabaseService, 
    public router: Router
  ) { 

  }

  createRoutine() {
    this.servicio.insertRoutine(this.text, this.hour, this.day)
      .then(() => {
        alert('Row Inserted!');
        this.navCtrl.navigateRoot("/tabs/tab3");
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  redirectToTab3(){
    this.navCtrl.navigateRoot("/tabs/tab3");
  }

}
