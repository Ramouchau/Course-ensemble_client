import {UserToken} from "./auth-socket-interfaces";

export interface ClientItem {
    id?: number;
    name: string;
    quantity?: string;
    status?: number;
    addBy?: UserToken;
}

export interface ClientList {
    id?: number;
    name?: string;
    items?: ClientItem[];
    users?: UserToken[]
    watchers?: UserToken[];
    owner?: UserToken;
    nbItems?: number;
    nbUsers?: number;
    updateAt?: Date
}

export interface GetAllListRequest {
	token: string
}

export interface GetAllListResponce {
	status: string
	code: number
	lists?: ClientList[]
}

export interface GetListRequest {
	token: string,
	idList: number
}

export interface GetListResponce {
	status: string
	code: number
	list: ClientList
}

export interface CreateListRequest {
    token: string
    listName: string
}

export interface CreateListResponse {
	status: string
	code: number
	idList?: number
}

export interface addItemToListRequest {
	token: string
	idList: number
	item: ClientItem
}

export interface addItemToListResponce {
	status: string
	code: number
	list: ClientItem[];
}

export interface updateItemRequest {
	token: string;
	idItem: number
	item: ClientItem
}

export interface updateItemResponce {
	status: string;
	code: number;
	item?: ClientItem;
    user?: UserToken;
    listName?: string;
}

export interface deleteItemRequest {
    token: string;
    idItem: number;
}

export interface deleteItemResponce {
    status: string;
    code: number;
}


export interface UpdateListRequest {
    token: string;
    idList: number;
    list: ClientList
}
export interface UpdateListResponse {
    status: string;
    code: number;
}

export interface searchUserRequest {
    token: string;
    research: string;
}

export interface UpdateList {
    by?: string;
    idList: number;
    list: ClientList;
}

export interface searchUserResponce {
    status: string;
    code: number;
    users?: UserToken[];
}


export interface addUserToListRequest {
    token: string;
    idList: number;
    idUser: number;
}

export interface addUserToListResponce {
    status: string;
    code: number;
}

export interface addWatcherToListRequest {
    token: string;
    idList: number;
    idUser: number;
}

export interface addWatcherToListResponce {
    status: string;
    code: number;
}

export interface AddedToList {
    by: string
    list: ClientList
}

export interface DeletedFromList {
    by: string
    list: ClientList
}

export interface ItemAdded {
	by: string
	item: ClientItem
}

export interface ItemDeleted {
	by: string
	item: ClientItem
}

export interface ItemUpdated {
	by: string
	item: ClientItem
}

export interface DeleteListRequest {
    token: string;
    id: number;
}

export interface DeleteListResponse {
    status: string;
    code: number;
    idList?: number;
}
