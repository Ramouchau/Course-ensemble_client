import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage, NavOptions } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { UserToken } from '../../interfaces/auth-socket-interfaces';
import { SplashScreen } from '@ionic-native/splash-screen';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	loading: Loading;
	registerCredentials = { email: '', password: '' };

	constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private splashScreen: SplashScreen) {

		this.auth.getUser().subscribe((res: UserToken) => {
			if (res) {
				this.nav.setRoot('HomePage');
				return;
			}
		}, (err: string) => {
			this.splashScreen.hide();
		});		
	}

	public createAccount() {
		this.nav.push('RegisterPage');
	}

	public login() {
		this.showLoading()
		this.auth.login(this.registerCredentials).subscribe(res => {
			if (res) {
				this.nav.setRoot("HomePage");
				this.nav.popToRoot();
			}
		}, err => {
				this.showError(err);
		});
	}

	private showLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Please wait...',
			dismissOnPageChange: true
		});
		this.loading.present();
	}

	private showError(text) {
		this.loading.dismiss();

		let alert = this.alertCtrl.create({
			title: 'Fail',
			subTitle: text,
			buttons: ['OK']
		});
		alert.present(<NavOptions>prompt);
	}
}