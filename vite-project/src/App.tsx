import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ConfigProvider, Layout } from 'antd'
import NotificationProvider from './providers/NotificationProvider'
import { routes } from './routes'
import AuthProvider from './providers/AuthProvider'

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'inherit',
        },
      }}
    >
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Layout>
              <Routes>
                {routes.map(({ path, element }, idx) => {
                  return <Route key={idx} path={path} element={element} />
                })}
              </Routes>
            </Layout>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ConfigProvider>
  )
}
