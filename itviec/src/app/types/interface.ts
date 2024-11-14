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

//------------ Companies types---------------//
export interface ICompany {
	_id: string;
	name: string;
	description: string;
	address: string;
	coordinates: string;
	followers: number;
	rating: number;
	logo: string;
	total_employee: number;
	image: string;
  }


//------------ Jobs Post types---------------//
export interface IPost {
	_id: string;
	position: string;
	description: string;
	requirements: string;
	companyName: string;
	location: string;
	salary: string;
	level: string;
	workingHours: string;
	deadline: string;
	contactInfo: string;
	status: string;
	postedDate: string;
	experience: string;
	numberOfPositions: number;
	tags: string[];
	isHot: boolean;
	companyId: ICompany;
	userId: string;
}


export interface IJobSlideProps {
	posts: IPost[]; 
}
  