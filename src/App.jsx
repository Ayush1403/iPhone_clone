import { useRef, useState } from 'react'
import {gsap} from 'gsap'
import {useGSAP} from "@gsap/react" 
import './App.css'
import { Navbar,Hero,Highlight, Model , Features, HowItWorks } from './components'

function App() {

  const container = useRef();


 
  

  return (
   <main   className='bg-black overflow-x-hidden w-full text-white'>
    <Navbar />
    <Hero />

    <Highlight />
    <Model />
    <Features />
   <HowItWorks />
   </main>
  )
}

export default App
