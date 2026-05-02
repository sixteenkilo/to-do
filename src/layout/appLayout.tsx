import { Layout, theme } from "antd";
import { AppSider } from "./appSider";
import { AppHeader } from "./appHeader";

const { Content, Footer } = Layout;
export const AppLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppSider />
      <Layout>
        <AppHeader />
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              marginTop: 8,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: "100%",
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Данные проект создан от нечего делать
        </Footer>
      </Layout>
    </Layout>
  );
};
