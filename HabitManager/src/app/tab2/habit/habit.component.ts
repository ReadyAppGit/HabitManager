import { Component, OnInit, Input, NgZone } from '@angular/core';
import { DatabaseService } from '../../database.service';

@Component({
  selector: 'app-habit',
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.scss'],
})
export class HabitComponent implements OnInit {
 
  @Input() public id: any;
  @Input() public title: string;
  @Input() public totalDays: any;
  @Input() public daysSoFar: any;
  @Input() public dateLastDayAdded: any;
  
  private daysLeft=0;
  constructor(public servicio:DatabaseService,public zone:NgZone) { 
  }

  ngOnInit() {
    this.totalDays=Number(this.totalDays);
    this.daysSoFar=Number(this.daysSoFar);
    this.calculateDaysLeft();
  }

  calculateDaysLeft(){
    if(this.dateLastDayAdded!="null"){
      let TodayDate = new Date().getTime();
      this.dateLastDayAdded=new Date(this.dateLastDayAdded);
      this.daysLeft = Math.floor((new Date(TodayDate- this.dateLastDayAdded).getTime()) / (1000 * 3600 * 24));
    }
  }

  addADayInAHabit(index){
    if(index+1>this.daysSoFar && (this.dateLastDayAdded=="null" || this.daysLeft!=0)){ //si no clickeó 2 o más veces la misma tarea en el mismo día

      let dateWithoutHours=new Date(new Date().setHours(0,0,0));
      this.servicio.addADayInAHabit(this.id,dateWithoutHours).then((res) => {
        this.zone.run(() => {
          this.dateLastDayAdded=new Date();
          this.daysSoFar=this.daysSoFar+1;
          this.calculateDaysLeft();
        });
      })
        .catch(e => {
          console.log("error " + JSON.stringify(e))
        });
    }else{
      console.log("entra al else")
    }
  }

}
