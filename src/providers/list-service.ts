import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { Socket } from 'ng-socket-io';
import { Storage } from '@ionic/storage';
import { UserRegisterRequest, UserLoginResponse, UserRegisterResponse, GetUserResponse, UserToken } from '../interfaces/auth-socket-interfaces'

import 'rxjs/add/operator/map';
import {
    addItemToListRequest,
    addUserToListRequest,
    addUserToListResponce,
    addWatcherToListRequest,
    addWatcherToListResponce,
    CreateListRequest,
    CreateListResponse,
    deleteItemRequest,
    deleteItemResponce,
    GetAllListRequest,
    GetAllListResponce,
    GetListRequest,
    searchUserRequest,
    searchUserResponce,
    updateItemRequest,
    updateItemResponce,
    UpdateListRequest,
    UpdateListResponse,
    AddedToList,
    DeleteListRequest,
    DeleteListResponse,
    DeletedFromList,
    ItemAdded,
    ItemDeleted,
    ItemUpdated, UpdateList
} from "../interfaces/list-interfaces";

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
	public getAllList(req: GetAllListRequest) {
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

    public updateItem(item: updateItemRequest) {
        return Observable.create(observer => {
            this.socket.emit('update-item', item)
            this.socket.fromEventOnce<updateItemResponce>("update-item").then(res => {
                if (res.code != 200)
                    observer.error(res.status);
                observer.next(res);
                observer.complete();
            });
        });
    }
    public updateList(list: UpdateListRequest) {
        return Observable.create(observer => {
            this.socket.emit('update-list', list)
            this.socket.fromEventOnce<UpdateListResponse>("update-list").then(res => {
                if (res.code != 200)
                    observer.error(res.status);
                observer.next(res);
                observer.complete();
            });
        });
    }
    public deleteItem(itemRequest: deleteItemRequest) {
        return Observable.create(observer => {
            this.socket.emit('delete-item', itemRequest)
            this.socket.fromEventOnce<deleteItemResponce>("delete-item").then(res => {
                if (res.code != 200)
                    observer.error(res.status);
                observer.next(res);
                observer.complete();
            });
        });
    }
    public deleteList(deleteListRequest: DeleteListRequest) {
        return Observable.create(observer => {
            this.socket.emit('delete-list', deleteListRequest)
            this.socket.fromEventOnce<DeleteListResponse>("delete-list").then(res => {
                if (res.code != 200)
                    observer.error(res.status);
                observer.next(res);
                observer.complete();
            });
        });
    }

	public searchUser(searchRequest: searchUserRequest) {
		return Observable.create(observer => {
			this.socket.emit('search-user', searchRequest)
			this.socket.fromEventOnce<searchUserResponce>("search-user").then(res => {
				if (res.code != 200)
					observer.error(res.status);
				observer.next(res);
				observer.complete();
			});
		});
	}
	public addUserToList(addUser: addUserToListRequest) {
		return Observable.create(observer => {
			this.socket.emit('add-user-to-list', addUser)
			this.socket.fromEventOnce<addUserToListResponce>("add-user-to-list").then(res => {
				if (res.code != 200)
					observer.error(res.status);
				observer.next(res);
				observer.complete();
			});
		});
	}
	public addWatcherToList(addWatcher: addWatcherToListRequest) {
		return Observable.create(observer => {
			this.socket.emit('add-watcher-to-list', addWatcher)
			this.socket.fromEventOnce<addWatcherToListResponce>("add-watcher-to-list").then(res => {
				if (res.code != 200)
					observer.error(res.status);
				observer.next(res);
				observer.complete();
			});
		});
	}
	public delUserToList(delUser: addUserToListRequest) {
		return Observable.create(observer => {
			this.socket.emit('del-user-to-list', delUser)
			this.socket.fromEventOnce<addUserToListResponce>("del-user-to-list").then(res => {
				if (res.code != 200)
					observer.error(res.status);
				observer.next(res);
				observer.complete();
			});
		});
	}
	public delWatcherToList(delWatcher: addWatcherToListRequest) {
		return Observable.create(observer => {
			this.socket.emit('del-watcher-to-list', delWatcher)
			this.socket.fromEventOnce<addWatcherToListResponce>("del-watcher-to-list").then(res => {
				if (res.code != 200)
					observer.error(res.status);
				observer.next(res);
				observer.complete();
			});
		});
	}

	public initOnUserAddedToList() {
		return Observable.create(observer => {
			this.socket.on("added-to", (data: AddedToList) => {
				observer.next(data);
			})
		});
	}

	public initOnListDeleted() {
		return Observable.create(observer => {
			this.socket.on("list-deleted", (data: DeletedFromList) => {
				observer.next(data);
			})
		});
	}

	public initOnItemAdded() {
		return Observable.create(observer => {
			this.socket.on("item-added", (data: ItemAdded) => {
				observer.next(data);
			})
		});
	}

	public initOnItemDeleted() {
		return Observable.create(observer => {
			this.socket.on("item-deleted", (data: ItemDeleted) => {
				observer.next(data);
			})
		});
	}

	public initOnItemUpdated() {
		return Observable.create(observer => {
			this.socket.on("item-updated", (data: ItemUpdated) => {
				observer.next(data);
			})
		});
	}

    public initOnListUpdated() {
        return Observable.create(observer => {
            this.socket.on("updated-list", (data: UpdateList) => {
            	console.log(data);
                observer.next(data);
            })
        });
    }

}
