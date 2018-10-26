import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavOptions, NavParams} from 'ionic-angular';
import {addItemToListRequest, ClientItem, ClientList, GetListRequest} from "../../interfaces/list-interfaces";
import {ListService} from "../../providers/list-service";
import {Storage} from "@ionic/storage";
import {AddItemModalPage} from "../add-item-modal/add-item-modal";
import {AuthService} from "../../providers/auth-service";

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
    private list: ClientList = {};
  constructor(public navCtrl: NavController, public auth: AuthService, public navParams: NavParams, public ls: ListService, private storage: Storage, private alertCtrl: AlertController, public modalCtrl: ModalController)
  {
      this.actList = navParams.get("list");
      this.idList = navParams.get("id");
  }
  async addItem()
  {
      let addItemModal = this.modalCtrl.create(AddItemModalPage, {});
      addItemModal.onDidDismiss(data => {
          if (data && data.item)
          {
              this.list.items.push(data.item);
              let addItemRequest : addItemToListRequest = {token: this.auth.token, idList : this.idList, item: data.item};
              this.ls.addItemInList(addItemRequest).subscribe(res => {
                 console.log(res);
                 this.list = data.list;
              }, err => {
                  this.showError(err);
              });
          }
      });
      addItemModal.present();
  }
  public itemSelected(item)
  {
      console.log(item);
  }
  async ionViewDidLoad() {
      if (this.actList == null)
      {
          let listRequest : GetListRequest = {token: await this.storage.get('token'), idList : this.idList};
          this.ls.getOneListById(listRequest).subscribe(res => {
              console.log(res, '<--');
              this.list = res.list;
              let item : ClientItem = {
                  name: "Test 1",
                  quantity: 5,
                  status: 0
              }
              this.list.items.push(item)
              console.log(this.list.items, "<===");
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
