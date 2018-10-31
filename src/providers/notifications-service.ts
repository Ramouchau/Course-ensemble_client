import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Socket } from 'ng-socket-io';
import { AddedToList } from '../interfaces/list-interfaces';

/*
  Generated class for the NotificationsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationsServiceProvider {

  constructor(private localNotifications: LocalNotifications, private socket: Socket) {
    console.log('home page');
    this.socket.on("added-to", (data: AddedToList) => {
      this.localNotifications.schedule({
        text: 'kir🅱️izia is a li🅱️tard',
        led: 'FF0000',
      });
      alert("on lmao");
    })
  }

}
