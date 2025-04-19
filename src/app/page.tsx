'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import {  FiMessageSquare, FiCheckCircle, FiUsers } from 'react-icons/fi';

import Link from 'next/link';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

  // Refs for each section
  const homeRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  const teamMembers = [
    {
      name: "Debjeet Singha",
      role: "AI Lead",
      image: "/images/debjeet.jpg",

    },
    {
      name: "Shaurya Pandit",
      role: "AI Lead",
      image: "/images/shaurya.jpg",

    },
    {
      name: "Debojit Roy",
      role: "Full-Stack Developer",
      image: "/images/debojit.png",

    },
    {
      name: "Anurag Jyoti",
      role: "Full-Stack Developer",
      image: "/images/anurag.jpg",

    }
  ];

  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }

    // Auto-rotate team members
    const interval = setInterval(() => {
      setCurrentTeamIndex((prev) => (prev + 1) % teamMembers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [controls, isInView, teamMembers.length]);


  // type SectionRefs = {
  //   id: string;
  //   ref: React.RefObject<HTMLDivElement>;
  // };


  // Scroll animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'home', ref: homeRef },
        { id: 'features', ref: featuresRef },
        { id: 'stats', ref: statsRef },
        { id: 'download', ref: downloadRef },
        { id: 'team', ref: teamRef },
      ];

      for (const section of sections) {
        const element = section.ref.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Floating Navbar */}
      <motion.nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-6"
        style={{ opacity, scale }}
      >
        <div className="bg-white/80 backdrop-blur-md rounded-full shadow-lg p-2 flex justify-between items-center">
          <motion.div
            className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            FakeNewsDetector
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {['home', 'features', 'stats', 'download', 'team'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(eval(`${item}Ref`))}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${activeSection === item
                    ? 'bg-yellow-400 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 pt-20 bg-white/90 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col space-y-4 p-6">
              {['home', 'features', 'stats', 'download', 'team'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(eval(`${item}Ref`))}
                  className={`px-6 py-3 rounded-xl text-lg font-medium capitalize transition-all duration-300 ${activeSection === item
                      ? 'bg-yellow-400 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * ['home', 'features', 'stats', 'download', 'team'].indexOf(item) }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-0.1">
        {/* Hero Section */}
        <section
          ref={homeRef}
          className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
        >


          <div className="absolute inset-0 overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-100 to-blue-100"></div>
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-300 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-blue-300/30 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -40, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Fight <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Fake News</span> with AI
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Our AI-powered chatbot detects fake news in real-time on Discord, helping you stay informed with accurate information.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                  onClick={() => scrollToSection(downloadRef)}
                >
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-gray-800 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                  onClick={() => scrollToSection(featuresRef)}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-blue-500 rounded-3xl opacity-20 blur-xl"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="p-4 bg-gray-100 flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mx-auto text-sm font-medium text-gray-600">Discord Chat</div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-end">
                      <div className="bg-blue-100 rounded-lg p-3 max-w-xs">
                        <p className="text-gray-800">!check Earth is flat.</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-gray-800">Let me analyze that for you...</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <motion.div
                        className="bg-green-50 border border-green-200 rounded-lg p-3 max-w-xs"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                      >
                        <div className="flex items-start mb-2">
                          <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800">🔍Fact-Check Result: &quot;Earth is flat.&quot;</p>
                            <p className="text-sm text-gray-600">The statement &quot;earth is flat&quot; is inaccurate. There is overwhelming scientific evidence, including satellite imagery, observations of ships disappearing hull first over the horizon, and circumnavigation, that demonstrates the Earth is a sphere (more accurately, an oblate spheroid).</p>
                          </div>
                        </div>
                       
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section
          ref={featuresRef}
          className="py-20 px-6 bg-gradient-to-b from-white to-blue-50"
        >

          <div className="max-w-6xl mx-auto">



            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI chatbot comes packed with features to help you combat misinformation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                
                {
                  icon: <FiMessageSquare className="w-8 h-8 text-blue-600" />,
                  title: "Real-Time Analysis",
                  description: "Instant detection of fake news with Gemini AI API integration",
                },
                {
                  icon: <FiCheckCircle className="w-8 h-8 text-green-600" />,
                  title: "Credible Sources",
                  description: "Cross-references with trusted fact-checking organizations",
                },
                {
                  icon: <FiUsers className="w-8 h-8 text-indigo-600" />,
                  title: "Community Reports",
                  description: "Aggregates user reports to improve detection accuracy",
                },
                
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Statistics Section */}
        <section
          ref={statsRef}
          className="py-20 px-6 bg-gradient-to-b from-blue-50 to-indigo-50"
        >

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Impact of Fake News</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Misinformation is causing real harm across multiple sectors of society
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 h-full">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Fake News Statistics</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                        Public Health Impact
                      </h4>
                      <ul className="text-gray-600 space-y-2 pl-5">
                        <li className="relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-400 pl-4">
                          87% of people encountered COVID-related misinformation (WHO, 2021)
                        </li>
                        <li className="relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-400 pl-4">
                          800+ deaths from false remedies in early pandemic (Lancet study)
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                        Political Influence
                      </h4>
                      <ul className="text-gray-600 space-y-2 pl-5">
                        <li className="relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-400 pl-4">
                        &quot;Pope endorses Trump&quot; fake story shared 1M times in 2016 election
                        </li>
                        <li className="relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-400 pl-4">
                          In some states, more fake news shared than real news (Oxford study)
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                        Psychological Impact
                      </h4>
                      <ul className="text-gray-600 space-y-2 pl-5">
                        <li className="relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-400 pl-4">
                          False news spreads 6x faster than true news (MIT, 2018)
                        </li>
                        <li className="relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-400 pl-4">
                          70% more likely to retweet fake news due to novelty
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
                        Economic Harm
                      </h4>
                      <ul className="text-gray-600 space-y-2 pl-5">
                        <li className="relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-400 pl-4">
                          Fake tweet caused Dow to drop 143 points in 3 minutes (2013)
                        </li>
                        <li className="relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-400 pl-4">
                          WEF lists digital misinformation as top global risk
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 h-full">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">More Concerning Data</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                        Hate Crimes & Social Unrest
                      </h4>
                      <ul className="text-gray-600 space-y-2 pl-5">
                        <li className="relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-400 pl-4">
                          Facebook misinformation contributed to Rohingya violence in Myanmar
                        </li>
                        <li className="relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-400 pl-4">
                          30+ killed in India (2017-18) from lynchings fueled by fake news
                        </li>
                        <li className="relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-400 pl-4">
                          Fake videos escalated 2020 Delhi riots
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
                        Youth & Education
                      </h4>
                      <ul className="text-gray-600 space-y-2 pl-5">
                        <li className="relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-400 pl-4">
                          82% of middle schoolers can&apos;t distinguish ads from news (Stanford)
                        </li>
                        <li className="relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-400 pl-4">
                          Only 25% of high school students check sources of photos
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="w-3 h-3 rounded-full bg-teal-500 mr-2"></span>
                        Global Reach
                      </h4>
                      <ul className="text-gray-600 space-y-2 pl-5">
                        <li className="relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-400 pl-4">
                          Discord limited forwarding after India lynchings
                        </li>
                        <li className="relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-400 pl-4">
                          50% of US adults see fake news as bigger problem than terrorism
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Our Solution&apos;s Impact</h4>
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl font-bold text-purple-600">92%</div>
                        <div className="text-gray-600">
                          accuracy rate in detecting fake news during beta testing
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section
          ref={downloadRef}
          className="py-20 px-6 bg-gradient-to-b from-indigo-50 to-purple-50"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get FakeNewsDetector Today</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Available on your favorite platform to help you combat misinformation
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid  gap-8 mb-16"
            >
              

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="w-20 h-20 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-6">
                    <FiMessageSquare className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Discord</h3>
                  <p className="text-gray-600 mb-6">Protect your community from misinformation on Discord</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all w-full max-w-xs"
                  >
                    <Link
                      href="https://discord.com/oauth2/authorize?client_id=1362787732442579004&permissions=1689934340025408&integration_type=0&scope=bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                    >
                      Add to Discord
                    </Link>
                  </motion.button>
                </div>
              </div>
            </motion.div>


          </div>
        </section>

        {/* Team Section */}
        <section
          ref={teamRef}
          className="py-20 px-6 bg-gradient-to-b from-purple-50 to-white"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Meet Our Team
            </h2>

            <div className="relative h-96">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: index === currentTeamIndex ? 1 : 0,
                    scale: index === currentTeamIndex ? 1 : 0.8,
                    zIndex: index === currentTeamIndex ? 1 : 0
                  }}
                  transition={{ duration: 0.6 }}
                  className={`absolute inset-0 flex flex-col items-center justify-center ${index === currentTeamIndex ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                >
                  <div className="relative w-64 h-64 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="absolute inset-0 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-lg shadow-purple-500/20"
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <motion.div
                      animate={{
                        rotate: 360,
                        transition: { duration: 20, repeat: Infinity, ease: "linear" }
                      }}
                      className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/20"
                    />
                  </div>

                  <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 font-bold mb-1">{member.name}</h3>
                    <p className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 font-medium mb-2">
                      {member.role}
                    </p>

                  </motion.div>
                </motion.div>
              ))}

              <div className="flex justify-center mt-8 space-x-2">
                {teamMembers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTeamIndex(index)}
                    className={`w-3 h-3 rounded-full transition ${index === currentTeamIndex
                        ? 'bg-purple-600 w-6'
                        : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    aria-label={`View team member ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </main>


    </>
  );
}
