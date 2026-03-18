import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import WhyUs from './components/WhyUs'
import TechStack from './components/TechStack'
import DemoShowcase from './components/DemoShowcase'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
    return (
        <div className="min-h-screen bg-[#020817]">
            <Navbar />
            <main>
                <Hero />
                <Services />
                <Projects />
                <DemoShowcase />
                <WhyUs />
                <TechStack />
                <Contact />
            </main>
            <Footer />
        </div>
    )
}

export default App
