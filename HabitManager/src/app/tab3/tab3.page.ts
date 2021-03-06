import { Component, NgZone } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DatabaseService } from '../database.service';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  private editValue;
  private routines;
  private routinesM;
  private routinesTU;
  private routinesW;
  private routinesTH;
  private routinesF;
  private routinesSA;
  private routinesSU;

  constructor(
    public navCtrl:NavController, 
    public menu:MenuService,
    public modalController: ModalController,
    public servicios: DatabaseService,
    private zone: NgZone,) {

  }

  ionViewDidEnter() {
    this.listRoutinesFromDB();
  }

  listRoutinesFromDB() {
    this.routines = [];

    this.routinesM = this.routines.filter(a=>a.day=="M");
    this.routinesTU = this.routines.filter(a=>a.day=="TU");
    this.routinesW = this.routines.filter(a=>a.day=="W");
    this.routinesTH = this.routines.filter(a=>a.day=="TH");
    this.routinesF = this.routines.filter(a=>a.day=="F");
    this.routinesSA = this.routines.filter(a=>a.day=="SA");
    this.routinesSU = this.routines.filter(a=>a.day=="SU");

    this.servicios.getRoutines().then((res) => {
      this.zone.run(() => {
        let row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            row_data.push(res.rows.item(i));
          }
        }
        this.routines = row_data;
      });
    })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  redirectToNewRoutine(){ 
    this.navCtrl.navigateRoot("/tabs/tab3/new-routine");
  }

  changeEditOption(){
    this.editValue=!this.editValue;
  }

}
