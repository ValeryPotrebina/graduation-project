import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const siderStyle = {
  padding: '1rem',
  backgroundColor: '#0958d9',
};

export default function AppSider() {
  return (
    <Layout.Sider style={siderStyle} width="25%">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1">
          <Link to="/courses">Курсы</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/materials">Материалы</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
