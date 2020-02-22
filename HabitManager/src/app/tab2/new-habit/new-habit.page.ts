import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { DatabaseService } from '../../database.service';
import { PopoverPage } from '../popover/popover.page';


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
  private iconName:any="book";

  constructor(public popoverController:PopoverController,public navCtrl:NavController,public servicio:DatabaseService) { }

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
    this.servicio.insertHabit(this.title, this.totalDays, this.daysSoFar, this.dateLastDayAdded,this.iconName)
      .then(() => {
        alert('Row Inserted!');
        this.navCtrl.navigateRoot("/tabs/tab2");
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }



  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      translucent: true
    });

    popover.onDidDismiss()
    .then((data)=>{
      console.log("desde edit habit");
      if(data.data){
        this.iconName=data.data;
      }
    })
    return await popover.present();
  }


}
