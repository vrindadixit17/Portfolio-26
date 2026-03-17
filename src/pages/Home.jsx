import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', transition: 'background 0.4s ease' }}>
      <Navbar />
      <div id="home"><Hero /></div>
      <div id="about"><About /></div>
      <div id="footer"><Footer /></div>
    </div>
  )
}
