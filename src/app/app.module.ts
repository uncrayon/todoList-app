import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyD8D53PBYj7WvyJ1bam72ejqAlxvwkU9Cw",
  authDomain: "utodo-app.firebaseapp.com",
  databaseURL: "https://utodo-app-default-rtdb.firebaseio.com",
  projectId: "utodo-app",
  storageBucket: "utodo-app.appspot.com",
  messagingSenderId: "970271552177",
  appId: "1:970271552177:android:feb433ddd2b9a4d9ba6890"
};
const app = initializeApp(firebaseConfig);

import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

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

