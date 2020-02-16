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
        this.createOrReadTaskTable();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }


  createOrReadTaskTable() {
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY, title varchar(50),state varchar(20),category varchar(20), date varchar(50) )', [])
      .then(() => {
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      }); 
  }



  insertTask(title,state,category,date) {
    return this.databaseObj.executeSql('INSERT INTO task (title,state,category,date) VALUES ("' + title + '","'+state+'","'+category+'","' + date + '")', []);
  }


  getTasks() {
    return this.databaseObj.executeSql("SELECT * FROM task", []);
  }

  completeTask(taskID){
    return this.databaseObj.executeSql("UPDATE task SET state='finished' WHERE task.id='"+taskID+"'", []);
  }
  editTask(taskID,title,state,category,date){
    return this.databaseObj.executeSql("UPDATE task SET title='"+title+"',state='"+state+"',category='"+category+"',date='"+date+"'  WHERE task.id='"+taskID+"'", []);
  }
  deleteTask(taskID){
    return this.databaseObj.executeSql("DELETE FROM task WHERE task.id='"+taskID+"'", []);
  }






}
