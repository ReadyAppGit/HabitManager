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
    // this.editValue=true;
    this.listRoutinesFromDB();
  }

  listRoutinesFromDB() {
    this.routines = [
      {id:"1", text:"Do homework", hour:"02:00 PM", day:"M"},
      {id:"2", text:"College", hour:"06:00 PM", day:"M"},
      {id:"3", text:"martees", hour:"09:00 PM", day:"TU"},
      {id:"3", text:"martees", hour:"09:00 PM", day:"TU"},
      {id:"3", text:"martees", hour:"09:00 PM", day:"TU"},
      {id:"3", text:"mier", hour:"09:00 PM", day:"W"},
      {id:"3", text:"jueves", hour:"09:00 PM", day:"TH"},
      {id:"3", text:"jueves", hour:"09:00 PM", day:"TH"},
      {id:"3", text:"jueves", hour:"09:00 PM", day:"TH"},
      {id:"3", text:"viernes", hour:"09:00 PM", day:"F"},
      {id:"3", text:"sabado", hour:"09:00 PM", day:"SA"},
      {id:"3", text:"domingo", hour:"09:00 PM", day:"SU"},
    ];

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
