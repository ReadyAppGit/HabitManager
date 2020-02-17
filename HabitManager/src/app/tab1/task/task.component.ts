import { Component, OnInit, Input, NgZone } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuService } from '../../menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  @Input() public id: any;
  @Input() public title: string;
  @Input() public state: string;
  @Input() public category: string;
  @Input() public date: any;

  private daysLeft = 0;
  private editValue;
  private dateTransformated;

  private check;
  private editTaskReference: Subscription = null;

  constructor(public menu:MenuService,public navCtrl: NavController, public router: Router, public servicio: DatabaseService, public zone: NgZone, private alertCtrl: AlertController) { }

  ngOnInit() {
    if(this.state=="finished"){
      this.check=true;
    }
    this.transformTheDate();
    this.subscribeToEditTaskValue();
  }

  subscribeToEditTaskValue(){
    this.editTaskReference = this.menu.EditTask$.subscribe((value)=>{
      this.zone.run(() => {
        this.editValue=value;
      });
    });
  }
  transformTheDate() {
    this.date = new Date(this.date);
    if (this.state == "finished") {
      this.dateTransformated = "Finished on " + this.date.toDateString();
    } else {
      let TodayDate = new Date().getTime();
      let TaskDate = new Date(this.date).getTime();
      this.daysLeft = Math.ceil((TaskDate - TodayDate) / (1000 * 3600 * 24));

      if (this.daysLeft == 0) { this.dateTransformated = "Today" }
      if (this.daysLeft == 1) { this.dateTransformated = "Tomorrow" }
      if (this.daysLeft > 1) { this.dateTransformated = this.daysLeft + " days left" }
      if (this.daysLeft < 0) { this.dateTransformated = -1 * this.daysLeft + " days late" }
    }
  }
  completeTask() {
    if (this.state != "finished") {
      this.presentAlertConfirm();
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: '<strong>Are you sure about finish this task?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.check=false;
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.servicio.completeTask(this.id).then((res) => {
              this.zone.run(() => {
                this.state = "finished";
                this.date = new Date();
                this.transformTheDate();
              });
            })
              .catch(e => {
                console.log("error " + JSON.stringify(e))
              });
          }
        }
      ]
    });

    await alert.present();
  }


  ngOnDestroy(){
    console.log("entra al on destroy")
    this.editTaskReference.unsubscribe();
  }

}
