import { Link, Route, Routes } from 'react-router-dom'

function Placeholder({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h1>
      <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
        Screens and states will mirror the Figma source of truth once provided. No UX has been
        invented here.
      </p>
      {children}
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Placeholder title="Director/Admin Dashboard">
            <p>Awaiting Figma details for navigation, filters, and widget layout.</p>
            <Link to="/assignments" style={{ color: '#2563eb' }}>
              View assignments placeholder
            </Link>
          </Placeholder>
        }
      />
      <Route
        path="/assignments"
        element={<Placeholder title="Assignments">Assignment list will follow Figma tables.</Placeholder>}
      />
      <Route path="*" element={<Placeholder title="Not Found" />} />
    </Routes>
  )
}
