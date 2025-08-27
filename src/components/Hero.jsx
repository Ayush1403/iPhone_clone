import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { hero, hero2 } from '../utils';
const Hero = () => {

    const [videoSrc,setVideoSrc]= useState(
        window.innerWidth < 760 ? hero2 : hero)

 
        const handleVideoSrcSet = () => {
            if(window.innerWidth < 760){
                setVideoSrc(hero2)
            }
            else{
               setVideoSrc(hero)
            }
        }

        useEffect(()=>{
            window.addEventListener('resize',handleVideoSrcSet);
            return()=>{
                window.removeEventListener('resize',handleVideoSrcSet);
            }
        })

    const text = useRef();
    useGSAP(()=>{
        gsap.to(text.current,{
            opacity: 1,
            duration:1.5,
        }),
        gsap.to("#cta",{
            opacity: 1,
            duration:2,
            y: -50,
        })
    })
  return (


    <section className='w-full nav-height overflow-hidden bg-black relative'>
        <div className='h-5/6 w-full flex items-center justify-center flex-col'>
        <p ref={text} className='section-heading'>Iphone 15 Pro</p>
                <div className='md:w-10/12 w-9/12'>
            <video className='pointer-events-none'  autoPlay muted playsInline={true} key={videoSrc}>
                <source src={videoSrc} type='video/mp4' />
            </video>
        </div>
       
        </div>
        <div id='cta' className='flex flex-col items-center opacity-0 translate-y-20'>
            <a href="#highlights" className='px-5 py-2 rounded-3xl bg-primary my=5 hover:bg-transparent border border-transparent hover:text-primary hover:border-primary'>Buy</a>
            <p className=' font-normal text-xl '> From 5000/month or 120000</p>
        </div>
 
    </section>
  )
}

export default Hero