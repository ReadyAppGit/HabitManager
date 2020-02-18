import { Component, NgZone } from '@angular/core';
import { DatabaseService } from '../database.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private habits;
  constructor(public navCtrl:NavController,public servicio:DatabaseService, public zone:NgZone) { }


  ionViewDidEnter() {
    this.listhabitsFromDB();
  }

  listhabitsFromDB() {
    this.habits = [{ id: "1", title: "meh", totalDays: "5", daysSoFar: "3",dateLastDayAdded:new Date() }
    // { id: "2", title: "meh2", state: "unfinished", category: "work", date: new Date() }
    ];

    this.servicio.getHabits().then((res) => {

      this.zone.run(() => {
        let row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            row_data.push(res.rows.item(i));
          }
        }
        this.habits = row_data;
        console.log(this.habits);
      });
    })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  redirectToNewHabit(){
    this.navCtrl.navigateRoot("/tabs/tab2/new-habit");
  }

  
  
}
 