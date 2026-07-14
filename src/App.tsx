import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Grammar from './pages/Grammar'
import GrammarLesson from './pages/GrammarLesson'
import Stories from './pages/Stories'
import StoryReader from './pages/StoryReader'
import Progress from './pages/Progress'
import { Toaster } from 'react-hot-toast'

export default function App() {
  const location = useLocation()

  return (
    <Layout>
      <Toaster />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/grammar" element={<Grammar />} />
          <Route path="/grammar/:lessonId" element={<GrammarLesson />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:storyId" element={<StoryReader />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}
