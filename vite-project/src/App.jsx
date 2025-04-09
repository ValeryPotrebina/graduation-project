import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { routes } from "./routesConfig.jsx";
import { NotificationProvider } from "./shared/notification/NotificationProvider";
export default function App() {
  return (
    <NotificationProvider>
      <Router>
        <Layout>
          <Routes>
            {routes.map(({ path, element }, idx) => {
              return <Route key={idx} path={path} element={element} />;
            })}
          </Routes>
        </Layout>
      </Router>
    </NotificationProvider>
  );
}
