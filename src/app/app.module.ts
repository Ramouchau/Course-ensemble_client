import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { AuthService } from "../providers/auth-service";
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { CreatelistPage } from '../pages/createlist/createlist';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
	declarations: [
		MyApp,
		LoginPage,
		ProfilePage,
		CreatelistPage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		SocketIoModule.forRoot(config),
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		LoginPage,
		ProfilePage,
		CreatelistPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		AuthService,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
