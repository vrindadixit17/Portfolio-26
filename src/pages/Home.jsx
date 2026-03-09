import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import Skills from "../components/Skills"
import Works from "../components/Works"
import Projects from "../components/Projects"
import Contact from "../components/Contact"

export default function Home() {
  return (
    <div className="bg-[#f4f2ef] min-h-screen">
      <Navbar />
      <div id="home"><Hero /></div>
      <div id="about"><About /></div>
      <div id="skills"><Skills /></div>
      <div id="works"><Works /></div>
      <div id="projects"><Projects /></div>
      <div id="contact"><Contact /></div>
    </div>
  )
}
