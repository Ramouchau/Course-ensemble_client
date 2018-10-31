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
    this.socket.on("added-to", (data: AddedToList) => {
      this.localNotifications.schedule({
        text: data.by + " vous a ajouté à sa liste " + data.list.name + " !",
        led: 'FF0000',
      });
    })
  }

}
