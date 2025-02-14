import { Layout } from "antd";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  color: "#fff",
  height: 60,
  padding: '1rem',
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};


export default function AppHeader() {
  return (
    <Layout.Header style={headerStyle}>
      <h1>AppHeader</h1>
    </Layout.Header>
  );
}
