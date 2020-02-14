import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  @Input() public title: string;
  @Input() public state: string;
  @Input() public category: string;
  @Input() public date: any;

  private daysLeft = 0;
  private dateTransformated;
  constructor() { }
 
  ngOnInit() {
    this.transformTheDate();
  }

  transformTheDate() {
    this.date = new Date(this.date);
    if (this.state == "finished") {
      this.dateTransformated = "Finished on " + this.date.toDateString();
    } else {
      let TodayDate = new Date().getTime();
      let TaskDate = new Date(this.date).getTime();
      this.daysLeft = Math.ceil((TaskDate - TodayDate) / (1000 * 3600 * 24));

      if(this.daysLeft==0){this.dateTransformated="Today"}
      if(this.daysLeft==1){this.dateTransformated="Tomorrow"}
      if(this.daysLeft>1){this.dateTransformated=this.daysLeft+" days left"}
      if(this.daysLeft<0){this.dateTransformated=-1*this.daysLeft+" days late"}
    }

  }

}
