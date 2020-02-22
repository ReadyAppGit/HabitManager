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
        this.createOrReadRoutineTable();
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
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS habit (id INTEGER PRIMARY KEY, title varchar(50),totalDays varchar(20),daysSoFar varchar(20),dateLastDayAdded varchar (50),iconName varchar(20) )', [])
      .then(() => {
        // this.insertHabit("title", "10", "2","null");
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  insertHabit(title, totalDays, daysSoFar,dateLastDayAdded,iconName) {
    return this.databaseObj.executeSql('INSERT INTO habit (title,totalDays,daysSoFar,dateLastDayAdded,iconName) VALUES ("' + title + '","' + totalDays + '","' + daysSoFar + '","'+dateLastDayAdded+'","'+iconName+'")', []);
  }

  getHabits() {
    return this.databaseObj.executeSql("SELECT * FROM habit", []);
  }

  addADayInAHabit(habitID,dateAdded) {
    return this.databaseObj.executeSql("UPDATE habit SET daysSoFar=daysSoFar+1,dateLastDayAdded='"+dateAdded+"' WHERE habit.id='" + habitID + "'", []);
  }

  editHabit(habitID, title,iconName) {
    return this.databaseObj.executeSql("UPDATE habit SET title='" + title + "',title='" + title + "',iconName='"+iconName+"'  WHERE habit.id='" + habitID + "'", []);
  }

  // deleteHabit(habitID) {
  //   return this.databaseObj.executeSql("DELETE FROM habit WHERE habit.id='" + habitID + "'", []);
  // }


  createOrReadRoutineTable() {
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS routine (id INTEGER PRIMARY KEY, text varchar(50), hour varchar(50), day varchar(2) )', [])
      .then(() => {
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      }); 
  }

  insertRoutine(text, hour, day) {
    return this.databaseObj.executeSql('INSERT INTO routine (text, hour, day) VALUES ("' + text + '","'+hour+'","'+day+'")', []);
  }

  getRoutines() {
    return this.databaseObj.executeSql("SELECT * FROM routine", []);
  }

}
