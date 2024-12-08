export const menuItems = [
	{
		text: 'Dashboard',
		href: '/admin/dashboard',
		icon: 'DashboardIcon',
		subMenu: [
			{ text: 'Detail', href: '/admin/dashboard/detail' },
			{ text: 'Stats', href: '/admin/dashboard/stats' },
		],
	},
	{
		text: 'Inbox',
		href: '/admin/inbox',
		icon: 'InboxIcon',
		subMenu: [],
	},
	{
		text: 'Starred',
		href: '/admin/starred',
		icon: 'StarIcon',
		subMenu: [],
	},
	{
		text: 'Send email',
		href: '/admin/send-email',
		icon: 'SendIcon',
		subMenu: [],
	},
	{
		text: 'Drafts',
		href: '/admin/drafts',
		icon: 'DraftsIcon',
		subMenu: [],
	},
];

export const ALL_PERMISSIONS = {
	COMPANIES: {
		GET_PAGINATE: { method: 'GET', apiPath: '/api/companies', module: 'COMPANIES' },
		CREATE: { method: 'POST', apiPath: '/api/companies', module: 'COMPANIES' },
		UPDATE: { method: 'PATCH', apiPath: '/api/companies/:id', module: 'COMPANIES' },
		DELETE: { method: 'DELETE', apiPath: '/api/companies/:id', module: 'COMPANIES' },
	},
	JOBS: {
		GET_PAGINATE: { method: 'GET', apiPath: '/api/jobs', module: 'JOBS' },
		CREATE: { method: 'POST', apiPath: '/api/jobs', module: 'JOBS' },
		UPDATE: { method: 'PATCH', apiPath: '/api/jobs/:id', module: 'JOBS' },
		DELETE: { method: 'DELETE', apiPath: '/api/jobs/:id', module: 'JOBS' },
	},
	PERMISSIONS: {
		GET_PAGINATE: { method: 'GET', apiPath: '/api/permissions', module: 'PERMISSIONS' },
		CREATE: { method: 'POST', apiPath: '/api/permissions', module: 'PERMISSIONS' },
		UPDATE: { method: 'PATCH', apiPath: '/api/permissions/:id', module: 'PERMISSIONS' },
		DELETE: { method: 'DELETE', apiPath: '/api/permissions/:id', module: 'PERMISSIONS' },
	},
	RESUMES: {
		GET_PAGINATE: { method: 'GET', apiPath: '/api/resumes', module: 'RESUMES' },
		CREATE: { method: 'POST', apiPath: '/api/resumes', module: 'RESUMES' },
		UPDATE: { method: 'PATCH', apiPath: '/api/resumes/:id', module: 'RESUMES' },
		DELETE: { method: 'DELETE', apiPath: '/api/resumes/:id', module: 'RESUMES' },
	},
	ROLES: {
		GET_PAGINATE: { method: 'GET', apiPath: '/api/roles', module: 'ROLES' },
		CREATE: { method: 'POST', apiPath: '/api/roles', module: 'ROLES' },
		UPDATE: { method: 'PATCH', apiPath: '/api/roles/:id', module: 'ROLES' },
		DELETE: { method: 'DELETE', apiPath: '/api/roles/:id', module: 'ROLES' },
	},
	USERS: {
		GET_PAGINATE: { method: 'GET', apiPath: '/api/users', module: 'USERS' },
		CREATE: { method: 'POST', apiPath: '/api/users', module: 'USERS' },
		UPDATE: { method: 'PATCH', apiPath: '/api/users/:id', module: 'USERS' },
		DELETE: { method: 'DELETE', apiPath: '/api/users/:id', module: 'USERS' },
	},
};

export const ALL_MODULES = {
	AUTH: 'AUTH',
	COMPANIES: 'COMPANIES',
	FILES: 'FILES',
	JOBS: 'JOBS',
	PERMISSIONS: 'PERMISSIONS',
	RESUMES: 'RESUMES',
	ROLES: 'ROLES',
	USERS: 'USERS',
	SUBSCRIBERS: 'SUBSCRIBERS',
};




export const CHAT_HISTORY = [
	{ keyword: 'fpt', jobsCount: 849 },
	{ keyword: 'net intern', jobsCount: 86 },
	{ keyword: 'net', jobsCount: 162 },
	{ keyword: 'rikai', jobsCount: 6 },
	{ keyword: 'fpt intern', jobsCount: 0 },
	{ keyword: 'front end developer', jobsCount: 313 },
	{ keyword: 'hr intern', jobsCount: 153 },
	{ keyword: 'thực tập sinh it', jobsCount: 11 },
	{ keyword: 'internship', jobsCount: 2288 },
	{ keyword: 'intern web', jobsCount: 1 },
	{ keyword: 'intern web', jobsCount: 1 },
	{ keyword: 'intern web', jobsCount: 1 },
	{ keyword: 'intern web', jobsCount: 1 },
	{ keyword: 'intern web', jobsCount: 1 },
	{ keyword: 'intern web', jobsCount: 1 },
	{ keyword: 'intern web', jobsCount: 1 },
	{ keyword: 'intern web', jobsCount: 1 },
	{ keyword: 'intern web', jobsCount: 1 },
];
