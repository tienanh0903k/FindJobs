// components/AdminLayout.tsx
'use client'; // Đảm bảo đây là thành phần Client-Side

import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import 'antd/dist/reset.css'; 
import { RootStyleRegistry } from '@/components/admins/RootStyleRegistry';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Sử dụng usePathname

const { Header, Content, Footer, Sider } = Layout;

// Các mục menu
const items = [
  { key: '/', label: <Link href="/">Home</Link> },
  { key: '/admin/roles', label: <Link href="/admin/roles">Roles</Link> },
  { key: '/admin/dashboard', label: <Link href="/admin/dashboard">Dashboard</Link> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const pathname = usePathname(); 
  const [activeMenu, setActiveMenu] = useState<string>(pathname);

  useEffect(() => {
    setActiveMenu(pathname);
  }, [pathname]);

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
          items={items}
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
            <RootStyleRegistry>{children}</RootStyleRegistry>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
