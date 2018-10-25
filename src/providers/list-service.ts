import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { Socket } from 'ng-socket-io';
import { Storage } from '@ionic/storage';
import { UserRegisterRequest, UserLoginResponse, UserRegisterResponse, GetUserResponse, UserToken } from '../interfaces/auth-socket-interfaces'

import 'rxjs/add/operator/map';
import {
    addItemToListRequest,
    CreateListRequest,
    CreateListResponse,
    GetListRequest
} from "../interfaces/list-interfaces";

@Injectable()
export class ListService {
	private user: UserToken
	constructor(private socket: Socket) { }

	public createList(list: CreateListRequest) {
		return Observable.create(observer => {
			console.log("observable")
			this.socket.emit('create-list', list)
			this.socket.fromEventOnce<CreateListResponse>("create-list").then(res => {
				if (res.code != 200)
					observer.error(res.status);
				observer.next(res);
				observer.complete();
			});
		});
	}
    public addItemInList(item: addItemToListRequest) {
        return Observable.create(observer => {
            this.socket.emit('add-item-to-list', item)
            this.socket.fromEventOnce<CreateListResponse>("add-item-to-list").then(res => {
                if (res.code != 200)
                    observer.error(res.status);
                observer.next(res);
                observer.complete();
            });
        });
    }
    public getOneListById(list: GetListRequest) {
        return Observable.create(observer => {
            console.log("observable")
            this.socket.emit('get-list-bid', list)
            this.socket.fromEventOnce<CreateListResponse>("get-list-bid").then(res => {
                if (res.code != 200)
                    observer.error(res.status);
                observer.next(res);
                observer.complete();
            });
        });
    }
}