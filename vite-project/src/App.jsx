import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home"
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";

const { Content } = Layout;
export default function App() {
  return (
    <Router>
      <Layout>
        <Content>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}
