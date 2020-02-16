import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NewTaskPageModule } from './tab1/new-task/new-task.module';

//SQLITE PARA ALMACENAR LOS DATOS
import { SQLite } from '@ionic-native/sqlite/ngx';

// import { SuperTabsModule } from '@ionic-super-tabs/angular'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    // SuperTabsModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite
  ],
  bootstrap: [AppComponent]
})

// @NgModule({
//   imports: [
//     SuperTabsModule,
//   ],
// })

export class AppModule {}
