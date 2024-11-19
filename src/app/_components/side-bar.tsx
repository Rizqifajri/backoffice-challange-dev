'use client';
import React from 'react';
import { ProductOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { ListProduct } from '../(authenticated)/dashboard/products/_components/list-product';
import AddProductModal from '../(authenticated)/dashboard/products/_components/modal-add-product';

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: '1',
    icon: React.createElement(UserOutlined),
    label: 'Account'
  },
  {
    key: '2',
    icon: React.createElement(ProductOutlined),
    label: 'Product'
  },
];

export const SideBar: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <h1 style={{ color: 'white', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>Dasboard</h1>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <AddProductModal />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <ListProduct />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
