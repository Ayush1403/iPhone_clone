import { useRef, useState } from 'react'
import {gsap} from 'gsap'
import {useGSAP} from "@gsap/react" 
import './App.css'
import { Navbar,Hero,Highlight, Model } from './components'

function App() {

  const container = useRef();


 
  

  return (
   <main   className='bg-black w-full h-screen text-white'>
    <Navbar />
    <Hero />

    <Highlight />
    <Model />
   
   </main>
  )
}

export default App
