import { Component } from '@angular/core';
import {NavController, IonicPage, AlertController, NavOptions} from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { CreatelistPage } from '../createlist/createlist';
import { UserToken } from '../../interfaces/auth-socket-interfaces';
import { ListService } from '../../providers/list-service';
import {
    ClientList,
    GetAllListResponce,
    AddedToList,
    updateItemRequest,
    DeleteListRequest
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
	public lists: Array<ClientList>

	constructor(private nav: NavController, private auth: AuthService, private listService: ListService, private localNotifications: LocalNotifications, private splashScreen: SplashScreen, public alertCtrl: AlertController, public ls: ListService) {
		this.auth.getUser().subscribe((user: UserToken) => {
			this.listService.getAllList({ token: this.auth.token}).subscribe((lists: GetAllListResponce) => {
				this.lists = lists.lists
			}, (err: string) => {
				console.log(err)
			})
			this.listService.initOnUserAddedToList().subscribe((list: AddedToList) => {
				this.lists.push(list.list);
			});

			this.listService.initOnListDeleted().subscribe((list: DeletedFromList) => {
				let index = this.lists.findIndex((l) => l.id === list.list.id)
				this.lists.splice(index)
			})
		}, (err: string) => {
			this.nav.setRoot(LoginPage);
		});

		splashScreen.hide();
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
                    	let idList = this.lists[index].id;
                        let delListRequest: DeleteListRequest = {token: this.auth.token, id: idList};
                        this.ls.deleteList(delListRequest).subscribe(res => {
                        	this.lists.splice(index, 1);
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
