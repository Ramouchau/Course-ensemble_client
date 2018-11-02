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
import {ListService} from "../providers/list-service";
import {ListPage} from "../pages/list/list";
import {GetListPage} from "../pages/get-list/get-list";
import {AddItemModalPage} from "../pages/add-item-modal/add-item-modal";
import {DebounceClickDirective} from "../directives/DebounceClick";
import {AddUserModalPage} from "../pages/add-user-modal/add-user-modal";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NotificationsServiceProvider } from '../providers/notifications-service';

const config: SocketIoConfig = { url: 'http://185.212.226.34:3000/', options: {} };

@NgModule({
	declarations: [
		MyApp,
		LoginPage,
		ProfilePage,
		CreatelistPage,
		ListPage,
		GetListPage,
		AddItemModalPage,
		AddUserModalPage,
		DebounceClickDirective
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
		CreatelistPage,
		ListPage,
		GetListPage,
		AddItemModalPage,
		AddUserModalPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		AuthService,
		ListService,
		LocalNotifications,
    NotificationsServiceProvider,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
	]
})
export class AppModule { }
