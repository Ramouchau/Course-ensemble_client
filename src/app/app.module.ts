import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { AuthService } from "../providers/auth-service";
import { LoginPage } from "../pages/login/login";
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";
import { CreatelistPage } from "../pages/createlist/createlist";
import { ProfilePage } from "../pages/profile/profile";
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		ListPage,
		CreatelistPage,
		ProfilePage
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
		HomePage,
		ListPage,
		CreatelistPage,
		ProfilePage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		AuthService,
	]
})
export class AppModule { }
