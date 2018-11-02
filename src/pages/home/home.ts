import { Component } from '@angular/core';
import {NavController, IonicPage, AlertController, NavOptions, NavParams} from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { CreatelistPage } from '../createlist/createlist';
import { UserToken } from '../../interfaces/auth-socket-interfaces';
import { ListService } from '../../providers/list-service';
import {
    ClientList,
    GetAllListResponce,
    AddedToList,
    updateItemRequest,
    DeleteListRequest, DeletedFromList, UpdateList
} from '../../interfaces/list-interfaces';
import {GetListPage} from "../get-list/get-list";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../login/login";


@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	public lists: Array<ClientList> = []
	constructor(private nav: NavController, private auth: AuthService, private listService: ListService, private localNotifications: LocalNotifications, private splashScreen: SplashScreen, public alertCtrl: AlertController, public ls: ListService, public navParams: NavParams) {
		console.log("test");

	    this.auth.getUser().subscribe((user: UserToken) => {
			this.listService.getAllList({ token: this.auth.token}).subscribe((lists: GetAllListResponce) => {
				this.lists = lists.lists
			}, (err: string) => {
				console.log(err)
			})
			this.listService.initOnListDeleted().subscribe((list: DeletedFromList) => {
				let index = this.lists.findIndex((l) => l.id === list.list.id)
				this.lists.splice(index, 1)
			})

            this.listService.initOnUserAddedToList().subscribe((list: AddedToList) => {
                this.lists.push(list.list);
                this.lists = this.lists.sort((list1, list2) => {
                    return list1.updateAt > list2.updateAt ? -1 : 1;
                })
            });

            this.listService.initOnListUpdated().subscribe((list: UpdateList) => {
                console.log("update");
                let index = this.lists.findIndex((l) => l.id === list.list.id)
                this.lists[index] = list.list;
            })
		}, (err: string) => {
			this.nav.setRoot(LoginPage);
		});

		splashScreen.hide();
	}
    public ionViewWillEnter() {
        if (this.navParams.get('addList') != null)
        {
            let list = this.navParams.get('addList');
            list.owner = this.auth.user;
            list.nbItems = 0;
            list.nbUsers = 0;
            list.updateAt = Date.now();
            this.lists.push(list);
            this.lists = this.lists.sort((list1, list2) => {
                return list1.updateAt > list2.updateAt ? -1 : 1;
            })
            this.navParams.data.addList = null;
        }
        else if (this.navParams.get('editList') != null)
        {
            let list = this.navParams.get('editList');
            list.nbItems = list.items.length;
            list.nbUsers = (list.users ? list.users.length: 0) + (list.watchers ? list.watchers.length: 0);
            list.updateAt = Date.now();
            let indexOf = this.lists.findIndex((l) => l.id == list.id);
            this.lists[indexOf] = list;
            this.navParams.data.editList = null;
            this.lists = this.lists.sort((list1, list2) => {
                return list1.updateAt > list2.updateAt ? -1 : 1;
            })
        }
    }
	public openList(list)
	{
        this.nav.push(GetListPage, {
            list: null,
            id: list.id
        })
	}
	public createList() {
		this.nav.push(CreatelistPage)
	}

	public logout() {
		this.auth.logout().subscribe(succ => {
			this.nav.setRoot('LoginPage')
		});
	}
	public deleteList(index)
	{
		let alert = this.alertCtrl.create({
            title: 'Suppression de liste',
            message: 'Êtes-vous sûr de vouloir supprimer cette liste ?',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirmer',
                    handler: () => {
                    	let idList = index.id;
                        let delListRequest: DeleteListRequest = {token: this.auth.token, id: idList};
                        this.ls.deleteList(delListRequest).subscribe(res => {
                            let indexOf = this.lists.findIndex((l) => l.id == idList);
                        	this.lists.splice(indexOf, 1);
                        }, err => {
                            this.showError(err);
                        });
                    }
                }
            ]
        });
        alert.present();
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
