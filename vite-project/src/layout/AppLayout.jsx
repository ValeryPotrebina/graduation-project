import { Layout } from "antd";
import AppHeader from "./Header/AppHeader";
import AppSider from "./Sider/AppSider";
import AppContent from "./Content/AppContent";
export default function AppLayout() {
  return (
    <>
        <Layout>
          <AppHeader />
          <Layout>
            <AppSider />
            <AppContent />
          </Layout>
        </Layout>
    </>
  );
}
