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
        this.createOrReadHabitTable();
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

  insertTask(title, state, category, date) {
    return this.databaseObj.executeSql('INSERT INTO task (title,state,category,date) VALUES ("' + title + '","' + state + '","' + category + '","' + date + '")', []);
  }

  getTasks() {
    return this.databaseObj.executeSql("SELECT * FROM task", []);
  }

  completeTask(taskID) {
    return this.databaseObj.executeSql("UPDATE task SET state='finished' WHERE task.id='" + taskID + "'", []);
  }

  editTask(taskID, title, state, category, date) {
    return this.databaseObj.executeSql("UPDATE task SET title='" + title + "',state='" + state + "',category='" + category + "',date='" + date + "'  WHERE task.id='" + taskID + "'", []);
  }

  deleteTask(taskID) {
    return this.databaseObj.executeSql("DELETE FROM task WHERE task.id='" + taskID + "'", []);
  }





  createOrReadHabitTable() {
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS habit (id INTEGER PRIMARY KEY, title varchar(50),totalDays varchar(20),daysSoFar varchar(20),dateLastDayAdded varchar (50) )', [])
      .then(() => {
        this.insertHabit("title", "10", "2","null");
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  insertHabit(title, totalDays, daysSoFar,dateLastDayAdded) {
    return this.databaseObj.executeSql('INSERT INTO habit (title,totalDays,daysSoFar,dateLastDayAdded) VALUES ("' + title + '","' + totalDays + '","' + daysSoFar + '","'+dateLastDayAdded+'")', []);
  }

  getHabits() {
    return this.databaseObj.executeSql("SELECT * FROM habit", []);
  }

  addADayInAHabit(habitID,dateAdded) {
    return this.databaseObj.executeSql("UPDATE habit SET daysSoFar=daysSoFar+1,dateLastDayAdded='"+dateAdded+"' WHERE habit.id='" + habitID + "'", []);
  }

  // editHabit(habitID, title, totalDays, daysSoFar) {
  //   return this.databaseObj.executeSql("UPDATE habit SET title='" + title + "',totalDays='" + totalDays + "',daysSoFar='" + daysSoFar + "'  WHERE task.id='" + habitID + "'", []);
  // }

  // deleteHabit(habitID) {
  //   return this.databaseObj.executeSql("DELETE FROM habit WHERE habit.id='" + habitID + "'", []);
  // }






}
