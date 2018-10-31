import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {ClientItem} from "../../interfaces/list-interfaces";

/**
 * Generated class for the AddItemModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item-modal',
  templateUrl: 'add-item-modal.html',
})
export class AddItemModalPage {

  item: ClientItem = {name:"", quantity:"1", status:0}
  checked: boolean = false;
  private edit = false;
  constructor( public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {
      if (params.get("item") == null)
      {
        this.item = {name:"", quantity:"1", status:0};
      }
      else
      {
        this.item = params.get("item");
        this.checked = this.item.status == 1;
        this.edit = true;
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemModalPage');
  }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    add()
    {
      this.item.status = this.checked ? 1 : 0;
      this.viewCtrl.dismiss({item: this.item, edit: this.edit})
    }
}
