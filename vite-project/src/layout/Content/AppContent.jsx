import React from 'react';
import { Layout } from "antd";
import styles from "./AppContent.module.css";

export default function AppContent() {
  return (
    <Layout.Content className={styles.content} >
      <h1>Добро пожаловать в Базу знаний студента!</h1>
      <p>Здесь будут ваши курсы и материалы.</p>
    </Layout.Content>
  );
};

