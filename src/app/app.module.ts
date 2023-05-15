import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

const firebaseConfig :any = {
  apiKey: "AIzaSyD8D53PBYj7WvyJ1bam72ejqAlxvwkU9Cw",
  authDomain: "utodo-app.firebaseapp.com",
  databaseURL: "https://utodo-app-default-rtdb.firebaseio.com",
  project-id: "utodo-app",
  storageBucket: "utodo-app.appspot.com",
  massagingSenderId: "970271552177",
  appId: "1:970271552177:android:feb433ddd2b9a4d9ba6890"
};

firebase.initializeApp(firebaseConfig);
