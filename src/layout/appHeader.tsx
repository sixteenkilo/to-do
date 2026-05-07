import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Layout, Breadcrumb, theme, Button, Flex } from "antd";
import { useEffect, useState } from "react";
import { useThemeStore } from "../store/modeService";

const { Header } = Layout;

export const AppHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggle = useThemeStore((s) => s.toggleTheme);
  const mode = useThemeStore((s) => s.darkMode);
  const [now, setNow] = useState(new Date());

  // Текущая дата
  const date = now.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  // текущие время
  const time = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <Header
      style={{
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Breadcrumb items={[{ title: "Главная" }, { title: "Все задачи" }]} />

      <Flex gap={8} align="center">
        <div style={{ textAlign: "right", lineHeight: 1.2 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>{date}</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{time}</div>
        </div>
        <Button
          icon={mode ? <SunOutlined /> : <MoonOutlined />}
          shape="circle"
          onClick={toggle}
          variant="solid"
          color={mode ? "yellow" : "blue"}
        ></Button>
      </Flex>
    </Header>
  );
};
