import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { routes } from "./routesConfig";

export default function App() {
  return (
    <Router>
      <Layout>
          <Routes>
            {routes.map(({path, element}, idx) => {
              <Route key={idx} path={path} element={element}/>
            })}
          </Routes>
      </Layout>
    </Router>
  );
}
