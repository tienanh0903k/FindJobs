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
	error?: {
		code: string;
		message: string;
		status: number;
	};
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
	status?: number;
	file?: {
		url: string;
		name: string;
	};
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



//------------ USER TYPE---------------//

export interface IUserType {
	_id: string;
	password: string;
	awards: any[]; 
	certifications: any[]; 
	create_at: string; 
	address: string;
	email: string;
	position: string;
	projects: any[]; 
	avatar: string;
	role: {
	_id: string;
	name: string;
	};
	skills: any[]; 
	update_at: string; 
	userName: string;
	fullName: string;
	workExperience: any[]; 
	introduction: string;
	status: number;
}



export interface ICertification {
	_id: string;
	name: string;
	issuedDate: Date;
  }
  
  export interface IWorkExperience {
	position: string;
	company: string;
	duration: string; 
	description: string;
  }
  
  export interface IProject {
	name: string;
	description: string;
	duration: string;
  }


  export interface IResumeInfo {
	_id: string;
	password: string;
	awards: string[]; // Array of award names or IDs
	certifications: ICertification[];
	create_at: Date; // Date object instead of string
	address: string;
	currentPosition: string;
	email: string;
	position: string;
	projects: IProject[];
	avatar: string; // URL of the avatar image
	role: string; // If 'role' is an ID, you can define it as string; otherwise, create a Role interface
	skills: string[]; // Array of skills (strings)
	update_at: Date; // Date object instead of string
	userName: string;
	fullName: string;
	workExperience: IWorkExperience[];
	introduction: string;
  }
  

  export interface IUserResume {
	_id: string;
	password: string;
	awards: string[]; // Array of award names or IDs
	certifications: ICertification[];
	create_at: Date; // Date object instead of string
	address: string;
	email: string;
	position: string;
	projects: IProject[];
	avatar: string; // URL of the avatar image
	role: string; // If 'role' is an ID, you can define it as string; otherwise, create a Role interface
	skills: string[]; // Array of skills (strings)
	update_at: Date; // Date object instead of string
	userName: string;
	fullName: string;
	workExperience: IWorkExperience[];
	introduction: string;
  }




export interface IUserQuery{
	data: IUserType | undefined;
	isFetching: boolean;
	isSuccess: boolean;
	isError: boolean;
	error: any
}