import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavOptions, NavParams} from 'ionic-angular';
import {ClientList, CreateListRequest} from "../../interfaces/list-interfaces";
import {ListService} from "../../providers/list-service";
import { Storage } from '@ionic/storage';
import {GetListPage} from "../get-list/get-list";

/**
 * Generated class for the CreatelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createlist',
  templateUrl: 'createlist.html',
})

export class CreatelistPage {
  list: ClientList = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public ls: ListService, private storage: Storage, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatelistPage');
  }
  async createList() {
    console.log(this.list);
    let listRequest : CreateListRequest = {token: await this.storage.get('token'), listName : this.list.name};
    this.ls.createList(listRequest).subscribe(res => {
          /*if (res) {
              this.nav.setRoot("HomePage");
              this.nav.popToRoot();
          }*/
          console.log(res);
          console.log(res.idList)
        this.navCtrl.push(GetListPage, {
            list: null,
            id: res.idList
        })
      }, err => {
          this.showError(err);
      });
  }
    private showError(text) {

        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(<NavOptions>prompt);
    }
}
