import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { BackendStatusProvider } from './context/BackendStatusContext'
import AppShell from './layouts/AppShell'
import Landing from './pages/Landing'
import Overview from './pages/Overview'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import Support from './pages/Support'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <BackendStatusProvider>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Core Dashboard Application Shell */}
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Overview />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:orderNumber" element={<OrderDetail />} />
            <Route path="support" element={<Support />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Legacy / Direct convenience routes redirected to dashboard */}
          <Route path="/overview" element={<Navigate to="/app" replace />} />
          <Route path="/orders/*" element={<Navigate to="/app/orders" replace />} />
          <Route path="/support" element={<Navigate to="/app/support" replace />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BackendStatusProvider>
    </BrowserRouter>
  )
}

