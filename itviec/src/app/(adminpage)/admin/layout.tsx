'use client';
import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Typography, Breadcrumb, Button, Dropdown, Layout, Menu, MenuProps, Space, theme } from 'antd';
import 'antd/dist/reset.css';
import './style.css';
import { RootStyleRegistry } from '@/components/admins/RootStyleRegistry';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Sử dụng usePathname
import { useAppSelector } from '@/hook/useSelector';
import { IPermissionItem } from '@/app/types/interface';
import { ALL_MODULES, ALL_PERMISSIONS } from '@/constants';
import { ModalProvider } from '@/context/ModalProvider';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import Image from '@/components/base/Image';
const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

// Các mục menu

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	const pathname = usePathname();
	const [activeMenu, setActiveMenu] = useState<string>(pathname);

	const [menuItems, setMenuItems] = useState<MenuProps['items']>();

	const [breadcrumbItems, setBreadcrumbItems] = useState<JSX.Element[]>([]);

	//useSelector
	const currentUser: any = useAppSelector((state) => state.auth.currentUser);

	const listUserPermission = currentUser?.permissions
	const infoCompany = currentUser?.company
	console.log(infoCompany);
	// _id(pin): "671213dc92c1ab2b8b66493d"
	// name(pin): "Công ty Cổ phần tập đoàn Công nghệ Thăng Long"
	// logo(pin): "https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-co-phan-tap-doan-toan-cau-thang-long-5e6b637aa6837.jpg"
	// console.log('listUserPermission', listUserPermission);
	useEffect(() => {
		setActiveMenu(pathname);
	}, [pathname]);

	useEffect(() => {
		if (listUserPermission) {
			const view_Role = listUserPermission.find((item: IPermissionItem) => {
				//console.log(item);
				return (
					item.apiPath === ALL_PERMISSIONS.ROLES.GET_PAGINATE.apiPath &&
					item.module === ALL_MODULES.ROLES &&
					item.method === ALL_PERMISSIONS.ROLES.GET_PAGINATE.method
				);
			});

			const items = [
				{ key: '/', label: <Link href="/">Home</Link> },

				{ key: '/admin/dashboard', label: <Link href="/admin/dashboard">Dashboard</Link> },
				{ key: '/admin/company', label: <Link href="/admin/company">Công ty</Link> },
				{ key: '/admin/application', label: <Link href="/admin/application">Application</Link> },
				{ key: '/admin/blog', label: <Link href="/admin/blog">Tin tức</Link> },
				{ key: '/admin/account', label: <Link href="/admin/account">Người dùng</Link> },
				{ key: '/admin/posts', label: <Link href="/admin/posts">Bài đăng</Link> },
				{ key: '/message', label: <Link href="/message">Tin nhắn</Link> },

				...(view_Role
					? [{ key: '/admin/roles', label: <Link href="/admin/roles">Vai trò</Link> }]
					: []),
			];
			setMenuItems(items);
		}
	}, [listUserPermission]);

	useEffect(() => {
		const pathSnippets = pathname.split('/').filter((i) => i); // Tách pathname thành từng phần
		const breadcrumbList = pathSnippets.map((_, index) => {
			const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
			return (
				<Breadcrumb.Item key={url}>
					<Link href={url}>{pathSnippets[index]}</Link>
				</Breadcrumb.Item>
			);
		});

		setBreadcrumbItems([
			<Breadcrumb.Item key="/">
				<Link href="/">Home</Link>
			</Breadcrumb.Item>,
			...breadcrumbList,
		]);
	}, [pathname]);


	const menu = (
		<Menu>
			<Menu.Item key="company">
				<Space align="center">
					<Avatar size="small" src={infoCompany?.logo} style={{ backgroundColor: '#f56a00' }}>
						{infoCompany?.name?.charAt(0)}
					</Avatar>
					<span>{infoCompany?.name || 'Tên công ty chưa xác định'}</span>
				</Space>
			</Menu.Item>
			<Menu.Item key="logout">
				<Button type="link">Đăng xuất</Button>
			</Menu.Item>
		</Menu>
	);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible>
				<div className="logo" style={{ height: 32, margin: 16 }}>
					<h3 className="text-2xl font-bold text-white">Admin page</h3>
				</div>
				<Menu theme="dark" mode="inline" selectedKeys={[activeMenu]} items={menuItems} />
			</Sider>
			<Layout>
				<ModalProvider>
					<Header
						style={{
							padding: 0,
							background: colorBgContainer,
							display: 'flex',
							justifyContent: 'flex-end',
							alignItems: 'center',
							gap: '16px',
							paddingRight: '16px',
						}}
					>
						{/* {infoCompany && (
							<Space size="large" align="center">
								<img
									src={infoCompany.logo}
									alt={infoCompany.name}
									width={40}
									height={40}
									style={{ borderRadius: '50%' }}
								/>
								<Text strong style={{ fontSize: '16px' }}>
									{infoCompany.name}
								</Text>
							</Space>
						)} */}
						<Space>
							<Badge count={5} dot>
								<BellOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
							</Badge>
							<Dropdown overlay={menu} trigger={['click']}>
								<Avatar size="default" icon={<UserOutlined />} />
							</Dropdown>
						</Space>
					</Header>
					<Content style={{ margin: '0 16px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
						<div
							style={{
								padding: 24,
								background: colorBgContainer,
								borderRadius: borderRadiusLG,
								minHeight: 360,
							}}
						>
							{children}
							{/* <RootStyleRegistry>{children}</RootStyleRegistry> */}
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						NTASPOTTS ©{new Date().getFullYear()} Created by Ant UED
					</Footer>
				</ModalProvider>
			</Layout>
		</Layout>
	);
}
