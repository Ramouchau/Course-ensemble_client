import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	rootPage: any = LoginPage;
	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
		});
	}

	public openProfile() {
		this.nav.push(ProfilePage);
	}

}

