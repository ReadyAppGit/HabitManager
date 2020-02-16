import { Component, NgZone, ɵConsole } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private tasks;
  constructor(public modalController: ModalController, public servicios: DatabaseService,private zone: NgZone) {

  }
  ionViewDidEnter() {
    this.listTasksFromDB();
  }

  listTasksFromDB() {
    this.tasks=[{id:"1",title:"meh",state:"unfinished",category:"work",date:new Date()}];

    this.servicios.getRows().then((res) => {

      this.zone.run(() => {
        let row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            row_data.push(res.rows.item(i));
          }
        }
        this.tasks = row_data;
      });
    })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

}
