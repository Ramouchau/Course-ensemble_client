import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { UserRegisterRequest, UserRegisterResponse } from '../interfaces/auth-socket-interfaces'

import 'rxjs/add/operator/map';

export class User {
	name: string;
	email: string;

	constructor(name: string, email: string) {
		this.name = name;
		this.email = email;
	}
}

@Injectable()
export class AuthService {
	currentUser: User = null;

	constructor(private socket: Socket) {}

	public login(credentials) {
		if (credentials.email === null || credentials.password === null) {
			return Observable.throw("Please insert credentials");
		} else {
			return Observable.create(observer => {
				// At this point make a request to your backend to make a real check!
				let access = (credentials.password === "pass" && credentials.email === "email");
				this.currentUser = new User('Simon', 'saimon@devdactic.com');
				this.socket.emit('login', credentials)
				observer.next(access);
				observer.complete();
			});
		}
	}

	public register(credentials: UserRegisterRequest) {
		console.log('0');
		if (credentials.email === null || credentials.password === null) {
			return Observable.throw("Please insert credentials");
		} else {
			// At this point store the credentials to your backend!
			//this.socket.emit('register', credentials)
			return Observable.create(observer => {
				this.socket.emit('register', credentials)
				observer.next(true);
				observer.complete();
			});
		}
	}

	public getUserInfo(): User {
		return this.currentUser;
	}

	public logout() {
		return Observable.create(observer => {
			this.currentUser = null;
			observer.next(true);
			observer.complete();
		});
	}
}