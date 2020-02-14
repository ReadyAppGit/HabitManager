import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  databaseObj: SQLiteObject; // Database instance object
  readonly database_name: string = "HabitManager"; // DB name

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.createOrReadDB();
    })
  }


  createOrReadDB() {
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        this.createOrReadTable();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }


  createOrReadTable() {
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY, title varchar(50),state varchar(20),category varchar(20), date varchar(50) )', [])
      .then(() => {
        // this.insertRow("tarea1","pending","work",new Date().toString());
        // this.insertRow("tarea2","pending",new Date().toString());

        // alert('Table Created!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      }); 
  }



  insertRow(title,state,category,date) {
    return this.databaseObj.executeSql('INSERT INTO task (title,state,category,date) VALUES ("' + title + '","'+state+'","'+category+'","' + date + '")', []);
  }


  getRows() {
    return this.databaseObj.executeSql("SELECT * FROM task", []);
  }



}
