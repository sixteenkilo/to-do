import { Button, Layout, Menu, Divider } from "antd";
import { useState } from "react";
import {
  UnorderedListOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useProject } from "../store/projectService";
import { CreateProject } from "../components/createProject";
import { Link, useLocation, useNavigate } from "react-router-dom";

const items = [
  {
    key: "all",
    icon: <UnorderedListOutlined />,
    label: <Link to="/">"Все"</Link>,
  },
  {
    key: "today",
    icon: <CalendarOutlined />,
    label: <Link to="/tomorrow">Завтра</Link>,
  },
  {
    key: "week",
    icon: <ClockCircleOutlined />,
    label: <Link to="/week">На этой неделе</Link>,
  },
  {
    key: "overdue",
    icon: <WarningOutlined />,
    label: <Link to="/overdue">Просроченные</Link>,
  },
];

const { Sider } = Layout;

export const AppSider = () => {
  const location = useLocation();
  const activeKey = location.pathname.split("/").pop();
  const projects = useProject((s) => s.projects);
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const [modalCreate, setModalCreate] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="light"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          {/* LOGO */}
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              padding: collapsed ? 0 : "0 16px",
              fontWeight: 600,
              fontSize: 18,
            }}
          >
            {collapsed ? "TD" : "To Do"}
          </div>

          <Menu defaultSelectedKeys={["all"]} mode="inline" items={items} />
          {!collapsed && <Divider style={{ margin: "12px 0" }} />}
          <Menu
            mode="inline"
            onClick={({ key }) => navigate("/project/" + key)}
            selectedKeys={activeKey ? [activeKey] : []}
            items={projects.map((item) => ({
              key: item.id,
              label: item.title,
            }))}
          />
        </div>

        {/* ADD PROJECT */}
        <div style={{ padding: collapsed ? 8 : 16, marginTop: "auto" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            block
            onClick={() => setModalCreate(true)}
          >
            {!collapsed && "Создать проект"}
          </Button>
          <CreateProject
            open={modalCreate}
            close={() => setModalCreate(false)}
          />
        </div>
      </div>
    </Sider>
  );
};
