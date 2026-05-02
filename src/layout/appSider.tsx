import { Layout, Menu } from "antd";
import { useState } from "react";
import {
  UnorderedListOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const items = [
  { key: "all", icon: <UnorderedListOutlined />, label: "Все" },
  { key: "today", icon: <CalendarOutlined />, label: "Завтра" },
  { key: "week", icon: <ClockCircleOutlined />, label: "На этой неделе" },
  { key: "overdue", icon: <WarningOutlined />, label: "Просроченные" },
];

const { Sider } = Layout;
export const AppSider = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="light"
    >
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          padding: collapsed ? 0 : "0 16px",
          fontWeight: 600,
          fontSize: 18,
          letterSpacing: 0.5,
        }}
      >
        {collapsed ? "TD" : "To Do"}
      </div>
      <Menu defaultSelectedKeys={["all"]} mode="inline" items={items} />
    </Sider>
  );
};
