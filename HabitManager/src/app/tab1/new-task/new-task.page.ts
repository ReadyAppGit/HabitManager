import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  constructor(public modalController: ModalController, public servicio: DatabaseService, public router: Router) {

  }
  ionViewDidEnter() {
    console.log("ENTRA A NEW TASK")
  }

  createTask() {
    console.log([this.title, this.state, this.category, this.date]);
    this.servicio.insertTask(this.title, this.state, this.category, this.date)
      .then(() => {
        alert('Row Inserted!');
        this.router.navigate(['/tabs/tab1']);
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });

  }

}
