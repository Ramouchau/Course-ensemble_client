import { Component } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, NavOptions, NavParams } from 'ionic-angular';
import {
	addItemToListRequest, addUserToListRequest, addWatcherToListRequest,
	ClientItem,
	ClientList, deleteItemRequest,
	GetListRequest, searchUserRequest,
	updateItemRequest, UpdateListRequest, ItemAdded, ItemDeleted
} from "../../interfaces/list-interfaces";
import { ListService } from "../../providers/list-service";
import { Storage } from "@ionic/storage";
import { AddItemModalPage } from "../add-item-modal/add-item-modal";
import { AuthService } from "../../providers/auth-service";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { AddUserModalPage } from "../add-user-modal/add-user-modal";

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
    private list: ClientList = {watchers:[], users:[], owner: {id:-1, username:"", email:""}, id: -1, name:"", items: []};
    private nameListController = new FormControl('');
    private changeName$: Subscription;
    private isOwner = false;
    private canEdit = false;
  constructor(public navCtrl: NavController, public auth: AuthService, public navParams: NavParams, public ls: ListService, private storage: Storage, private alertCtrl: AlertController, public modalCtrl: ModalController)
  {
      this.actList = navParams.get("list");
      this.idList = navParams.get("id");
      this.changeName$ = this.nameListController.valueChanges
          .debounceTime(1000)
          .subscribe(newValue =>
          {
              if (this.list.name == newValue)
                  return;
              this.list.name = newValue
			  console.log(this.list.name);
              this.navCtrl.getPrevious().data = {};
              this.navCtrl.getPrevious().data.editList = this.list;
              let listRequest: UpdateListRequest = {token: this.auth.token, idList: this.list.id, list: this.list};
              this.ls.updateList(listRequest).subscribe(res => {
              }, err => {
                  this.showError(err);
              });
		  });
		  this.ls.initOnItemAdded().subscribe((res: ItemAdded) => {
			this.list.items.push(res.item);
            this.navCtrl.getPrevious().data = {};
            this.navCtrl.getPrevious().data.editList = this.list;
		});

		this.ls.initOnItemDeleted().subscribe((res: ItemDeleted) => {
			let index = this.list.items.findIndex((i) => i.id === res.item.id)
			this.list.items.splice(index, 1)
            this.navCtrl.getPrevious().data = {};
            this.navCtrl.getPrevious().data.editList = this.list;
		})

		this.ls.initOnItemUpdated().subscribe((res: ItemDeleted) => {
			let index = this.list.items.findIndex((i) => i.id === res.item.id)
			this.list.items[index] = res.item
		})

  }
    public editItem(item)
  {
      let editItemModal = this.modalCtrl.create(AddItemModalPage, {item: this.list.items[item]});
      editItemModal.onDidDismiss(data => {
          if (data && data.item) {
              let listRequest: updateItemRequest = {token: this.auth.token, idItem: data.item.id, item: data.item};
              this.ls.updateItem(listRequest).subscribe(res => {
              }, err => {
                  this.showError(err);
              });
          }
      });
      editItemModal.present();
  }
  public prepareQuantity(qua)
  {
      return (parseInt(qua) == qua) ? ("x" + qua) : qua;
  }
  public deleteItem(item)
  {
      this.navCtrl.getPrevious().data = {};
      this.navCtrl.getPrevious().data.editList = this.list;
      let deleteRequest : deleteItemRequest = {token: this.auth.token, idItem : this.list.items[item].id};
      this.ls.deleteItem(deleteRequest).subscribe(res => {
          this.list.items.splice(item, 1);
      }, err => {
          this.showError(err);
      });
  }
  public changeStateItem(item)
  {
      this.list.items[item].status = this.list.items[item].status == 1 ? 0 : 1;
      let listRequest : updateItemRequest = {token: this.auth.token, idItem : this.list.items[item].id, item: this.list.items[item]};
      this.ls.updateItem(listRequest).subscribe(res => {
      }, err => {
          this.showError(err);
      });
  }
  async addItem()
  {
      let addItemModal = this.modalCtrl.create(AddItemModalPage, {});
      addItemModal.onDidDismiss(data => {
          if (data && data.item)
          {
              if (data.edit == false) {
                  let addItemRequest: addItemToListRequest = {
                      token: this.auth.token,
                      idList: this.idList,
                      item: data.item
                  };
                  if (this.navCtrl.getPrevious().data == null)
                      this.navCtrl.getPrevious().data = {};
                  this.navCtrl.getPrevious().data.editList = this.list;
                  this.ls.addItemInList(addItemRequest).subscribe(res => {
                      console.log(res)
                  }, err => {
                      this.showError(err);
                  });
                  data.item.addBy = this.auth.getUser();
                  this.list.items.push(data.item);
              }
          }
      });
      addItemModal.present();
  }
  prepareList()
  {

  }
  async ionViewDidLoad() {
      if (this.actList == null)
      {
          let listRequest : GetListRequest = {token: await this.storage.get('token'), idList : this.idList};
          this.ls.getOneListById(listRequest).subscribe(res => {
              this.list = res.list;
              console.log(res.list);
              console.log(res);
              if (this.list.owner.id === this.auth.user.id) {
                  this.isOwner = true;
                  this.canEdit = true;
              }
              this.list.users.forEach(element => {
                  if (element.id === this.auth.user.id)
                    this.canEdit = true;
                });
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

	ngOnDestroy() {
		this.changeName$.unsubscribe();
	}

	addUser() {
		let addUserModal = this.modalCtrl.create(AddUserModalPage, { users: this.list.users, watchers: this.list.watchers });
		addUserModal.onDidDismiss(data => {
			if (data) {
                this.navCtrl.getPrevious().data = {};
                this.navCtrl.getPrevious().data.editList = this.list;
				this.list.users = [];
				this.list.watchers = [];
				for (let user of data.users) {
					if (user.rights == "edit") {
						this.list.users.push(user);
						if (data.usersSet.indexOf(user.id) == -1) {
							if (data.watchersSet.indexOf(user.id) != -1) {
								data.watchersSet.splice(data.watchersSet.indexOf(user.id));
								let addUserRequest: addWatcherToListRequest = {
									token: this.auth.token,
									idList: this.idList,
									idUser: user.id
								};
								this.ls.delWatcherToList(addUserRequest).subscribe(res => {
								}, err => {
									this.showError(err);
								});
							}
							let addUserRequest: addUserToListRequest = {
								token: this.auth.token,
								idList: this.idList,
								idUser: user.id
							};
							this.ls.addUserToList(addUserRequest).subscribe(res => {
							}, err => {
								this.showError(err);
							});
						}
						else {
							data.usersSet.splice(data.usersSet.indexOf(user.id));
						}
					}
					else {
						this.list.watchers.push(user);
						if (data.watchersSet.indexOf(user.id) == -1) {
							if (data.usersSet.indexOf(user.id) != -1) {
								data.usersSet.splice(data.usersSet.indexOf(user.id));
								let addUserRequest: addUserToListRequest = {
									token: this.auth.token,
									idList: this.idList,
									idUser: user.id
								};
								this.ls.delUserToList(addUserRequest).subscribe(res => {
								}, err => {
									this.showError(err);
								});
							}
							let addWatcherRequest: addWatcherToListRequest = {
								token: this.auth.token,
								idList: this.idList,
								idUser: user.id
							};
							this.ls.addWatcherToList(addWatcherRequest).subscribe(res => {
							}, err => {
								this.showError(err);
							});
						}
						else {
							data.watchersSet.splice(data.watchersSet.indexOf(user.id), 1);
						}
					}
				}
				data.usersSet.forEach((id) => {
					let addUserRequest: addUserToListRequest = {
						token: this.auth.token,
						idList: this.idList,
						idUser: id
					};
					this.ls.delUserToList(addUserRequest).subscribe(res => {
					}, err => {
						this.showError(err);
					});
				});
				data.watchersSet.forEach((id) => {
					let addUserRequest: addUserToListRequest = {
						token: this.auth.token,
						idList: this.idList,
						idUser: id
					};
					this.ls.delWatcherToList(addUserRequest).subscribe(res => {

					}, err => {
						this.showError(err);
					});
				})
			}
		});
		addUserModal.present();

	}
}
