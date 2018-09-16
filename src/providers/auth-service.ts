import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { Socket } from 'ng-socket-io';
import { Storage } from '@ionic/storage';
import { UserRegisterRequest, UserLoginResponse, UserRegisterResponse, GetUserResponse, UserToken } from '../interfaces/auth-socket-interfaces'

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
	private user: UserToken
	constructor(private socket: Socket, private storage: Storage) { }

	public login(credentials) {
		return Observable.create((observer: Observer<boolean>) => {
			this.socket.emit('login', credentials);
			this.socket.fromEventOnce<UserLoginResponse>("login").then(res => {
				if (res.code != 200)
					observer.error(res.status);

				this.storage.set('token', res.token);
				observer.next(true);
				observer.complete();
			});
		});
	}

	public getUser() {
		return Observable.create((observer: Observer<UserToken>) => {
			if (this.user){
				observer.next(this.user);
				observer.complete();
			}

			this.storage.get('token').then(token => {
				this.socket.emit('get-user', {token: token});
				this.socket.fromEventOnce<GetUserResponse>("get-user").then(res => {
					if (res.code != 200)
						observer.error(res.status);

					observer.next(res.user);
					observer.complete();
				});
			});
		});
	}

	public register(credentials: UserRegisterRequest) {
		return Observable.create(observer => {
			this.socket.emit('register', credentials)
			this.socket.fromEventOnce<UserRegisterResponse>("register").then(res => {
				if (res.code != 200)
					observer.error(res.status);

				this.storage.set('token', res.token);
				observer.next(true);
				observer.complete();
			});
		});
	}

	public logout() {
		return Observable.create(observer => {
			this.storage.remove('token');
			observer.next(true)
		});
	}
}