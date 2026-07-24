import { Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Topics from './pages/Topics.jsx'
import TopicDetail from './pages/TopicDetail.jsx'
import QuizSession from './pages/QuizSession.jsx'
import TravelMode from './pages/TravelMode.jsx'
import Progress from './pages/Progress.jsx'
import WeakAreas from './pages/WeakAreas.jsx'
import Revision from './pages/Revision.jsx'
import Settings from './pages/Settings.jsx'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topicId" element={<TopicDetail />} />
        <Route path="/topics/:topicId/quiz/:difficulty" element={<QuizSession />} />
        <Route path="/topics/:topicId/travel" element={<TravelMode />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/weak-areas" element={<WeakAreas />} />
        <Route path="/revision" element={<Revision />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AppShell>
  )
}
