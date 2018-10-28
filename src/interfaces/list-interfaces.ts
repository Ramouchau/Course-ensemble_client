export interface ClientItem {
	id?:number
	name: string
	quantity?: number
	status?: number
}

export interface ClientList {
	id?: number
	name?: string
	items?: ClientItem[]
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

export interface addUserToListRequest {
	idList: number
	idUser: number
}

export interface addUserToListResponce {
	status: string
	code: number
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
	status: string,
	code: number
}

export interface deleteItemRequest {
    token: string;
    idItem: number;
}

export interface deleteItemResponce {
    status: string;
    code: number;
}
