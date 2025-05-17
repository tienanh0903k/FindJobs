

/**
 * ************************API ****************************-
 */

export const URL_NEXT = 'http://localhost:3000'
export const URL_BACKEND = 'http://localhost:3001'


/**
 * **************************MENU *****************************
 */

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
	APPLICATION: {
		GET_PAGINATE: { method: 'GET', apiPath: '/api/application', module: 'APPLICATION' },
		CREATE: { method: 'POST', apiPath: '/api/application', module: 'APPLICATION' },
		UPDATE: { method: 'POST', apiPath: '/api/application/:id', module: 'APPLICATION' },
		DELETE: { method: 'DELETE', apiPath: '/api/application/:id', module: 'APPLICATION' },
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
    { keyword: 'React', jobsCount: 6 },
    { keyword: 'Node.js', jobsCount: 6 },
    { keyword: 'JavaScript', jobsCount: 3 },
    { keyword: 'TypeScript', jobsCount: 3 },
    { keyword: 'Python', jobsCount: 3 },
    { keyword: 'Figma', jobsCount: 2 },
    { keyword: 'Sketch', jobsCount: 2 },
    { keyword: 'Adobe XD', jobsCount: 2 },
    { keyword: 'Selenium', jobsCount: 2 },
    { keyword: 'Automation Testing', jobsCount: 2 },
    { keyword: 'Swift', jobsCount: 2 },
    { keyword: 'Kotlin', jobsCount: 2 },
    { keyword: 'Flutter', jobsCount: 2 },
    { keyword: 'Pandas', jobsCount: 1 },
    { keyword: 'TensorFlow', jobsCount: 1 },
    { keyword: 'AWS', jobsCount: 5 },
    { keyword: 'Docker', jobsCount: 5 },
    { keyword: 'Jenkins', jobsCount: 5 },
    { keyword: 'LAN', jobsCount: 3 },
    { keyword: 'WAN', jobsCount: 3 },
    { keyword: 'VPN', jobsCount: 3 },
    { keyword: 'CCNA', jobsCount: 3 },
    { keyword: 'MySQL', jobsCount: 2 },
    { keyword: 'PostgreSQL', jobsCount: 2 },
    { keyword: 'Oracle', jobsCount: 2 },
    { keyword: 'SQL', jobsCount: 2 },
    { keyword: 'HTML', jobsCount: 2 },
    { keyword: 'C', jobsCount: 2 },
    { keyword: 'C++', jobsCount: 2 },
    { keyword: 'C#', jobsCount: 2 },
    { keyword: 'Linux', jobsCount: 2 },
    { keyword: 'CI/CD', jobsCount: 2 },
    { keyword: 'JLPT', jobsCount: 4 },
    { keyword: 'Japanese Communication', jobsCount: 4 },
    { keyword: 'Bridge SE', jobsCount: 4 }
];







export const templates = [
	{
		id: 1,
		name: 'Elegant',
		imageUrl:
			'https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg',
	},
	{
		id: 2,
		name: 'Minimal',
		imageUrl:
			'https://cdn1.vieclam24h.vn/images/assets/img/cv8-202122.png',
	}
];

export const roles = {
	ADMIN: '66e412d0e72f47d74a6fa7e7',
	HR: '66e8410b7f7f221ba7a995b1',
	USER: '66e8425f7f7f221ba7a995b6'
}