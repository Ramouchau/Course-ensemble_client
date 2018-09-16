import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
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

	constructor(private splashScreen: SplashScreen, private nav: NavController, private auth: AuthService) {
		this.splashScreen.show();
		this.auth.getUser().subscribe((res: UserToken) => {
			this.user = res;
			console.log(this.user);
			this.splashScreen.hide();
		}, (err: string) => {
			this.nav.setRoot('LoginPage');
			this.splashScreen.hide();
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