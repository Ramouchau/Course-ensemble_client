import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage, LoadingController, Loading, NavOptions } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
@IonicPage()
@Component({
	selector: 'page-register',
	templateUrl: 'register.html',
})
export class RegisterPage {
	loading: Loading;
	createSuccess = false;
	registerCredentials = { email: '', username: '', password: '' };

	constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

	public register() {
		this.showLoading()
		this.auth.register(this.registerCredentials).subscribe(res => {
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