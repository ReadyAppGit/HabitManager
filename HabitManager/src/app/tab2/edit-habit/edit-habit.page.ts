import { Component, OnInit, NgZone, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../../database.service';
import { NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';

@Component({
  selector: 'app-edit-habit',
  templateUrl: './edit-habit.page.html',
  styleUrls: ['./edit-habit.page.scss'],
})
export class EditHabitPage {

  @Input() public id: any;
  @Input() public title: string;
  @Input() public totalDays: any;
  @Input() public daysSoFar: any;
  @Input() public dateLastDayAdded: any;
  @Input() public iconName: any;

  constructor(public popoverController:PopoverController,public router:Router,public navCtrl:NavController,public servicio:DatabaseService,public route:ActivatedRoute,public zone:NgZone) { }

  ionViewDidEnter(){
    this.route.paramMap.subscribe(params => {
      this.zone.run(() => {
        this.id = params.get("0");
        this.title = params.get("1");
        this.totalDays = Number(params.get("2"));
        this.daysSoFar = Number(params.get("3"));
        this.dateLastDayAdded = params.get("4");
        this.iconName = params.get("5");
      });
    }
    )
  }

  validateSize() {
    if (this.totalDays > 100) {
      this.totalDays = 100;
    }
    if (this.totalDays < 1) {
      this.totalDays = 1;
    }
  }

  editHabit(){
    this.servicio.editHabit(this.id, this.title,this.iconName)
    .then(() => {
      alert('Row edited!');
      this.router.navigate(['/tabs/tab2']);
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
  }
  
  redirectToTab2(){
    this.navCtrl.navigateRoot("/tabs/tab2");
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
