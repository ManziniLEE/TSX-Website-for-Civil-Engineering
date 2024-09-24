"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { Building2, HardHat, Ruler, Users } from 'lucide-react'

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredService, setHoveredService] = useState(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const services = [
    { icon: <Building2 size={40} />, title: 'Structural Engineering' },
    { icon: <HardHat size={40} />, title: 'Construction Management' },
    { icon: <Ruler size={40} />, title: 'Urban Planning' },
    { icon: <Users size={40} />, title: 'Project Consultation' },
  ]

  const projects = [1, 2, 3]

  const useScrollAnimation = () => {
    const controls = useAnimation()
    const ref = useRef(null)

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            controls.start('visible')
          }
        },
        { threshold: 0.1 }
      )

      if (ref.current) {
        observer.observe(ref.current)
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      }
    }, [controls])

    return [ref, controls]
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  const [heroRef, heroControls] = useScrollAnimation()
  const [servicesRef, servicesControls] = useScrollAnimation()
  const [projectsRef, projectsControls] = useScrollAnimation()
  const [contactRef, contactControls] = useScrollAnimation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col">
      <nav className="bg-transparent p-4 sticky top-0 z-50 backdrop-filter backdrop-blur-lg bg-opacity-30">
        <div className="container mx-auto flex justify-between items-center">
          <a className="text-2xl font-bold text-white" href="#">
            CivilTech Solutions
          </a>
          <button
            className="lg:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <ul className={`lg:flex ${isMenuOpen ? 'flex' : 'hidden'} flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0`}>
            {['Home', 'Services', 'Projects', 'Contact'].map((item) => (
              <li key={item}>
                <a className="text-white hover:text-gray-200 transition duration-300" href={`#${item.toLowerCase()}`}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="flex-grow">
        <motion.header
          id="home"
          className="py-20"
          ref={heroRef}
          initial="hidden"
          animate={heroControls}
          variants={fadeInVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Building Tomorrow's Infrastructure Today</h1>
                <p className="text-xl text-white opacity-80 mb-6">
                  CivilTech Solutions is your trusted partner in innovative civil engineering projects.
                </p>
                <a
                  href="#contact"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition duration-300 inline-block"
                >
                  Get in Touch
                </a>
              </div>
              <div>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Civil Engineering Project"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </motion.header>

        <motion.section
          id="services"
          className="py-20"
          ref={servicesRef}
          initial="hidden"
          animate={servicesControls}
          variants={fadeInVariants}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 text-center h-full flex flex-col items-center justify-center transition duration-300 hover:bg-opacity-20">
                    <div className="text-white mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  </div>
                  <AnimatePresence>
                    {hoveredService === index && (
                      <motion.div
                        className="absolute inset-0 bg-blue-600 bg-opacity-90 rounded-lg flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-white text-center px-4">
                          Learn more about our {service.title.toLowerCase()} services and how we can help your projects succeed.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="py-20 bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg"
          ref={projectsRef}
          initial="hidden"
          animate={projectsControls}
          variants={fadeInVariants}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                    <img src={`/placeholder.svg?height=300&width=400`} className="w-full h-48 object-cover" alt={`Project ${project}`} />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Project {project}</h3>
                      <p className="text-gray-600">A brief description of the project and its impact on the community and infrastructure.</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="py-20"
          ref={contactRef}
          initial="hidden"
          animate={contactControls}
          variants={fadeInVariants}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center text-white mb-8">Contact Us</h2>
                <form className="space-y-4">
                  <div>
                    <input type="text" className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 transition duration-300 focus:bg-opacity-30" placeholder="Your Name" />
                  </div>
                  <div>
                    <input type="email" className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 transition duration-300 focus:bg-opacity-30" placeholder="Your Email" />
                  </div>
                  <div>
                    <textarea className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 transition duration-300 focus:bg-opacity-30" rows={4} placeholder="Your Message"></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition duration-300"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 CivilTech Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}