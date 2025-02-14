import {Layout} from "antd";

const contentStyle = {
    textAlign: "center",
    minHeight: "calc(100vh - 60px)",
    color: "#fff",
    backgroundColor: "#051559",
    padding: "1rem",
};
export default function AppContent() {
  return (
    <Layout.Content style={contentStyle}>
      <h1>AppContent</h1>
    </Layout.Content>
  );
}
