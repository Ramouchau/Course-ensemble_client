import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Socket } from 'ng-socket-io';
import { AddedToList, UpdateListResponse, updateItemResponce } from '../interfaces/list-interfaces';
import { AuthService } from './auth-service';
import { UserToken } from '../interfaces/auth-socket-interfaces';

/*
  Generated class for the NotificationsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationsServiceProvider {

  constructor(private localNotifications: LocalNotifications, private socket: Socket, private auth: AuthService) {
    this.socket.on("added-to", (data: AddedToList) => {
      this.localNotifications.schedule({
        text: data.by + " vous a ajouté à sa liste " + data.list.name + " !",
        led: 'FF0000',
      });
    })

    this.socket.on("update-item", (data: updateItemResponce) => {
      this.auth.getUser().subscribe((res: UserToken) => {
        if (data.user && res.id !== data.user.id) {
          // j'ai laissé le console.log en commentaire comme ça si on veut voir le message sur navigateur suffit de le décommenter
          console.log(data.user.username + " a modifié " + data.item.name + " sur la liste " + data.listName + " !");
          this.localNotifications.schedule({
            text: data.user.username + " a modifié " + data.item.name + " sur la liste " + data.listName + " !",
            led: 'FF0000',
          });
        }
      });
    })

  }

}
