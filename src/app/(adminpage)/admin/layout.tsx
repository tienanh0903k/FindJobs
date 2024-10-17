// components/AdminLayout.tsx
'use client'; 

import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd';
import 'antd/dist/reset.css'; 
import { RootStyleRegistry } from '@/components/admins/RootStyleRegistry';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Sử dụng usePathname
import { useAppSelector } from '@/hook/useSelector';
import { IPermissionItem } from '@/app/types/interface';
import { ALL_MODULES, ALL_PERMISSIONS } from '@/constants';

const { Header, Content, Footer, Sider } = Layout;

// Các mục menu

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const pathname = usePathname(); 
  const [activeMenu, setActiveMenu] = useState<string>(pathname);

  const [menuItems, setMenuItems] = useState<MenuProps['items']>();

  //useSelector 
  const listUserPermission = useAppSelector(state => state.auth.currentUser?.permissions);

 // console.log('listUserPermission', listUserPermission);
  useEffect(() => {
    setActiveMenu(pathname);
  }, [pathname]);

  useEffect(() => {
    if (listUserPermission) {
      const view_Role = listUserPermission.find((item: IPermissionItem)=> {
        //console.log(item);
        return item.apiPath === ALL_PERMISSIONS.ROLES.GET_PAGINATE.apiPath && item.module === ALL_MODULES.ROLES && item.method === ALL_PERMISSIONS.ROLES.GET_PAGINATE.method
      })

      
      const items = [
        { key: '/', label: <Link href="/">Home</Link> },
        
        { key: '/admin/dashboard', label: <Link href="/admin/dashboard">Dashboard</Link> },
  
        ...(view_Role ? [{ key: '/admin/roles', label: <Link href="/admin/roles">Roles</Link> }] : []),
      ];
      setMenuItems(items);

    }  
  }, [listUserPermission]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div
          className="logo"
          style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.3)' }}
        />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeMenu]} // Thiết lập trạng thái active
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
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
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
