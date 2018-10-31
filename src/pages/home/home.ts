import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { CreatelistPage } from '../createlist/createlist';
import { UserToken } from '../../interfaces/auth-socket-interfaces';
import { ListService } from '../../providers/list-service';
import { ClientList, GetAllListResponce } from '../../interfaces/list-interfaces';
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

	constructor(private nav: NavController, private auth: AuthService, private listService: ListService, private localNotifications: LocalNotifications, private splashScreen: SplashScreen) {
		this.auth.getUser().subscribe((user: UserToken) => {
			this.listService.getAllList({ token: this.auth.token}).subscribe((lists: GetAllListResponce) => {
				this.lists = lists.lists
				console.log(this.lists);
			}, (err: string) => {
				console.log(err)
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
}
