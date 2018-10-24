import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { Socket } from 'ng-socket-io';
import { Storage } from '@ionic/storage';
import { UserRegisterRequest, UserLoginResponse, UserRegisterResponse, GetUserResponse, UserToken } from '../interfaces/auth-socket-interfaces'

import 'rxjs/add/operator/map';
import { GetAllListRequest, GetAllListResponce } from '../interfaces/list-interfaces';
import { AuthService } from './auth-service';

@Injectable()
export class HomeService {

	public constructor(private socket: Socket, private auth: AuthService) {}

	public getAllList() {
		console.log(this.auth.user)
		/*return Observable.create(observer => {
			this.socket.emit('register', {})
			this.socket.fromEventOnce<GetAllListResponce>("register").then(res => {
				if (res.code != 200)
					observer.error(res.status)

				observer.next(true);
				observer.complete();
			});
		});*/
	}
}