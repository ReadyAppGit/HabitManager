import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DatabaseService } from '../../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage {

  private title;
  private state = "unfinished";
  private category;
  private date;
  constructor(public navCtrl:NavController,public modalController: ModalController, public servicio: DatabaseService, public router: Router) {

  }

  createTask() {
    console.log([this.title, this.state, this.category, this.date]);
    this.servicio.insertTask(this.title, this.state, this.category, this.date)
      .then(() => {
        alert('Row Inserted!');
        this.navCtrl.navigateRoot("/tabs/tab1");
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  redirectToTab1(){ //forma alternativa en la que si se llama el ngondestroy bien
    this.navCtrl.navigateRoot("/tabs/tab1");
  }


}
