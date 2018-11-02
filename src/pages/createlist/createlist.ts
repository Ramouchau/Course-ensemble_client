import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavOptions, NavParams} from 'ionic-angular';
import {ClientList, CreateListRequest, CreateListResponse} from "../../interfaces/list-interfaces";
import {ListService} from "../../providers/list-service";
import {GetListPage} from "../get-list/get-list";
import { AuthService } from '../../providers/auth-service';
import {HomePage} from "../home/home";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public ls: ListService, private alertCtrl: AlertController, private auth: AuthService) {}

  public ionViewDidLoad() {
    console.log('ionViewDidLoad CreatelistPage');
	}

  public createList() {
    let listRequest : CreateListRequest = {token: this.auth.token, listName : this.list.name};
    this.ls.createList(listRequest).subscribe((res: CreateListResponse) => {
        this.list.id = res.idList;
        this.navCtrl.getPrevious().data.addList = this.list;
        this.navCtrl.pop()
        this.navCtrl.getPrevious().data = null;
        this.navCtrl.push(GetListPage, {
            list: null,
            id: res.idList
				})
      }, err => {
          this.showError(err)
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
