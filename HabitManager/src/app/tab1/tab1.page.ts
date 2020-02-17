import { Component, NgZone, ɵConsole } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DatabaseService } from '../database.service';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private tasks;
  private editValue;
  constructor(public navCtrl:NavController,public menu:MenuService,public modalController: ModalController, public servicios: DatabaseService,private zone: NgZone) {

  }
  ionViewDidEnter() {
    this.editValue=true;
    this.listTasksFromDB();
  }

  listTasksFromDB() {
    this.tasks=[{id:"1",title:"meh",state:"unfinished",category:"work",date:new Date()},
    {id:"2",title:"meh2",state:"unfinished",category:"work",date:new Date()}
  ];

    this.servicios.getTasks().then((res) => {

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

  redirectToNewTask(){ //forma alternativa en la que si se llama el ngondestroy bien
    this.navCtrl.navigateRoot("/tabs/tab1/new-task");
  }

  changeEditOption(){
    this.menu.changeEditOption(this.editValue)
    this.editValue=!this.editValue;
  }

}
