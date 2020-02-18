import { Component, OnInit, NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../../database.service';

@Component({
  selector: 'app-new-habit',
  templateUrl: './new-habit.page.html',
  styleUrls: ['./new-habit.page.scss'],
})
export class NewHabitPage implements OnInit {


  private title: string;
  private totalDays: number;
  private daysSoFar: any = "0";
  private dateLastDayAdded: any = "null";


  constructor(public navCtrl:NavController,public servicio:DatabaseService) { }

  ngOnInit() {
    this.totalDays = 1;
  }

  validateSize() {
    if (this.totalDays > 100) {
      this.totalDays = 100;
    }
    if (this.totalDays < 1) {
      this.totalDays = 1;
    }
  }

  redirectToTab2(){
    this.navCtrl.navigateRoot("/tabs/tab2");
  }

  createHabit(){
    this.servicio.insertHabit(this.title, this.totalDays, this.daysSoFar, this.dateLastDayAdded)
      .then(() => {
        alert('Row Inserted!');
        this.navCtrl.navigateRoot("/tabs/tab2");
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
}
