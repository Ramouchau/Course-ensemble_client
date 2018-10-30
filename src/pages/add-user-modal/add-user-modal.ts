import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserToken} from "../../interfaces/auth-socket-interfaces";
import {searchUserRequest} from "../../interfaces/list-interfaces";
import {AuthService} from "../../providers/auth-service";
import {ListService} from "../../providers/list-service";

/**
 * Generated class for the AddUserModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-user-modal',
  templateUrl: 'add-user-modal.html',
})
export class AddUserModalPage {

    searchQuery: string = '';
    users: UserToken[] = [];
    usersSelected: UserToken[] = [];
    usersSetSelected: number[] = [];
    watchersSetSelected: number[] = [];
    usersIdSelected: number[] = [];
    edit: false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private auth: AuthService, private ls: ListService) {

      if (this.navParams.get("users") != null)
      {
          let users: UserToken[] = this.navParams.get("users");
          users.forEach((user) =>
          {
              user.rights = "edit"
              this.usersSelected.push(user);
              this.usersSetSelected.push(user.id);
              this.usersIdSelected.push(user.id);
          })
      }
      if (this.navParams.get("watchers") != null)
      {
          let users: UserToken[] = this.navParams.get("watchers");
          users.forEach((user) =>
          {
              user.rights = "show"
              this.usersSelected.push(user);
              this.watchersSetSelected.push(user.id);
              this.usersIdSelected.push(user.id);
          })
      }
  }


    getUsers(ev: any) {
      this.users = [];
        if (this.searchQuery.length < 3)
            return;
        const val = ev.target.value;
        let userSearch : searchUserRequest = {token: this.auth.token, research: val};
        this.ls.searchUser(userSearch).subscribe(res => {
            res.users.forEach((user) =>
            {
                if (this.usersIdSelected.indexOf(user.id) == -1) {
                    let addUser: UserToken = {id: user.id, username: user.username, email: user.email};
                    this.users.push(addUser);
                }
            })
        });
    }
    addInList(index)
    {
        let user = this.users[index];
        if (!user.hasOwnProperty('rights'))
        {
            user.rights = "show";
        }
        this.users.splice(index, 1);
        this.usersSelected.push(user);
        this.usersIdSelected.push(user.id);
    }

    deleteUser(index)
    {
        let user = this.usersSelected[index];
        if (this.searchQuery != "" &&  user.email.indexOf(this.searchQuery) != -1)
            this.users.push(user);
        this.usersSelected.splice(index, 1);
        this.usersIdSelected.splice(this.usersIdSelected.indexOf(user.id), 1);
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    add()
    {
        this.viewCtrl.dismiss({users: this.usersSelected, usersSet: this.usersSetSelected, watchersSet: this.watchersSetSelected});
    }

}
