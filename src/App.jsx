import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import ScrollClimber from './components/ScrollClimber'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'

export default function App() {
  return (
    <div className="relative flex min-h-svh flex-col bg-ink text-paper">
      <ScrollManager />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 z-20 hidden w-[7px] rounded-full lg:block"
        style={{
          left: 'calc(clamp(0px, 1vw, 1rem) + min(16rem, 25vw - 15rem) - 3px)',
          height: 'calc(4vh + min(32rem, 50vw - 30rem) * 0.66)',
          background:
            'linear-gradient(90deg, #7c7266 0%, #b3a48e 45%, #948876 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 z-20 hidden w-[7px] rounded-full lg:block"
        style={{
          left: 'calc(clamp(0px, 1vw, 1rem) + min(16rem, 25vw - 15rem) - 3px - min(32rem, 50vw - 30rem) * 0.042)',
          top: 'calc(4vh + min(32rem, 50vw - 30rem) * 0.66)',
          background:
            'linear-gradient(90deg, #7c7266 0%, #b3a48e 45%, #948876 100%)',
        }}
      />
      <ScrollClimber />
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
