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