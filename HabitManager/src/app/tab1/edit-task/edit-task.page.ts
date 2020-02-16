import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DatabaseService } from '../../database.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage {

  @Input() public id: any;
  @Input() public title: string;
  @Input() public state: string;
  @Input() public category: string;
  @Input() public date: any;
  constructor(private router:Router,private route: ActivatedRoute, public zone: NgZone,public servicio:DatabaseService) { }

  ionViewDidEnter() {
    this.route.paramMap.subscribe(params => {
      this.zone.run(() => {
        this.id = params.get("0");
        this.title = params.get("1");
        this.state = params.get("2");
        this.category = params.get("3");
        this.date = params.get("4");
      });
    }
    )
  }
  editTask(){
    this.servicio.editRow(this.id,this.title, this.state, this.category, this.date)
      .then(() => {
        alert('Row edited!');
        this.router.navigate(['/tabs/tab1']);
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

}
