import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { Socket } from 'ng-socket-io';
import { Storage } from '@ionic/storage';
import { UserRegisterRequest, UserLoginResponse, UserRegisterResponse, GetUserResponse, UserToken } from '../interfaces/auth-socket-interfaces'

import 'rxjs/add/operator/map';
import { CreateListRequest, CreateListResponse, GetListRequest, GetAllListRequest, GetAllListResponce } from "../interfaces/list-interfaces";

@Injectable()
export class ListService {
	private user: UserToken
	constructor(private socket: Socket) { }

	public createList(list: CreateListRequest) {
		return Observable.create(observer => {
			this.socket.emit('create-list', list)
			this.socket.fromEventOnce<CreateListResponse>("create-list").then(res => {
				if (res.code != 200)
					observer.error(res.status);
				observer.next(res);
				observer.complete();
			});
		});
	}

	public getOneListById(list: GetListRequest) {
		return Observable.create(observer => {
			this.socket.emit('get-list-bid', list)
			this.socket.fromEventOnce<CreateListResponse>("get-list-bid").then(res => {
				if (res.code != 200)
					observer.error(res.status);
				observer.next(res);
				observer.complete();
			});
		});
	}

	public getAllList(req: GetAllListRequest){
		return Observable.create(observer => {
			this.socket.emit('get-all-list', req)
			this.socket.fromEventOnce<GetAllListResponce>("get-all-list").then(res => {
				if (res.code != 200)
					observer.error(res.status);
				observer.next(res);
				observer.complete();
			})
		})
	}
}
