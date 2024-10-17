export interface LoginFormValues {
	username: string;
	password: string;
}

//------------ Auth types---------------//

export interface AuthState {
	currentUser: UserType | null;
	isLoggedIn: boolean;
}


export interface ProfileType {
	avatar: string; 
	fullName: string;
	_id: string
}

export interface UserType {
	_id: string;
	role: string;
	email: string;
	user?: ProfileType
	access_token?: string;
	refresh_token?: string;
	permissions?: IPermissionItem[]
}


export interface IPermissionItem {
	_id: string;
	name: string;
	apiPath: string;
	method: string;
	module: string
}