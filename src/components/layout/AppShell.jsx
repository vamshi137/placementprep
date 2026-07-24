import BottomNav from './BottomNav.jsx'

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-md w-full mx-auto px-5 pb-28">{children}</main>
      <BottomNav />
    </div>
  )
}
