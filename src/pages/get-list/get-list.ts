import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavOptions, NavParams} from 'ionic-angular';
import {GetListRequest} from "../../interfaces/list-interfaces";
import {ListService} from "../../providers/list-service";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the GetListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-get-list',
  templateUrl: 'get-list.html',
})
export class GetListPage {

    public actList = null;
    public idList = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ls: ListService, private storage: Storage, private alertCtrl: AlertController)
  {
      this.actList = navParams.get("list");
      this.idList = navParams.get("id");
  }

  async ionViewDidLoad() {
      if (this.actList == null)
      {
          let listRequest : GetListRequest = {token: await this.storage.get('token'), idList : this.idList};
          this.ls.getOneListById(listRequest).subscribe(res => {
              /*if (res) {
                  this.nav.setRoot("HomePage");
                  this.nav.popToRoot();
              }*/
              console.log(res, '<--');
          }, err => {
              this.showError(err);
          });
      }
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
