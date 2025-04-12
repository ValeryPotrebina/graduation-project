import { Layout } from "antd";
import styles from "./AppSider.module.css";
import AppSiderMenu from "./AppSiderMenu";


export default function AppSider() {
  return (
    <Layout.Sider className={styles.sider} width="25%">
      <AppSiderMenu />
    </Layout.Sider>
  );
}
