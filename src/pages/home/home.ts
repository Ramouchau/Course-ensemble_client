import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { CreatelistPage } from '../createlist/createlist';
import { UserToken } from '../../interfaces/auth-socket-interfaces';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	public user: UserToken;

	constructor(private nav: NavController, private auth: AuthService, public modalCtrl: ModalController) {
		this.auth.getUser().subscribe((res: UserToken) => {
			this.user = res;
			console.log(this.user);
		}, (err: string) => {
			this.nav.setRoot('LoginPage');
		});
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