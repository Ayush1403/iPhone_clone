import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import { animate, animateVid } from '../utils/animation'
import { explore1Img, explore2Img, exploreVideo } from '../utils'

const Features = () => {
    gsap.registerPlugin(ScrollTrigger)
    const videoRef = useRef()
    
useGSAP(() => {
    gsap.to("#exploreVideo", {
        scrollTrigger: {
            trigger: "#exploreVideo",
            toggleActions: "play pause reverse restart",
            start: "-10% bottom",
         
        },
        onComplete: () => {
            if (videoRef.current) videoRef.current.play()
        }
    })

    animate(
        "#features_title",
        { opacity: 1, y: 0, duration: 1 },
        { start: "top 90%" }
    )

    animate(
        ".g_grow",
        { scale: 1, opacity: 1, ease: "power1.out", duration: 1 },
        { scrub: 1 } // ✅ correct prop
    )

    animate(
        ".g_text",
        { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
        { start: "top 85%" }
    )
}, [])

    return (
        <section className='h-full common-padding bg-znc relative overflow-hidden'>
            <div className='screen-max-w'>
                <div className='mb-12 w-full'>
                    <h1 id='features_title' className='section-heading'>Explore the beast</h1>
                </div>
                <div className='flex flex-col justify-center items-center overflow-hidden'>
                    <div className='mt-32 mb-24 pl-24'>
                        <h2 className='text-5xl lg:text-7xl font-semibold'>iPhone</h2>
                        <h2 className='text-5xl lg:text-7xl font-semibold'>Forged In Titanium</h2>
                    </div>
                </div>
                <div className='flex justify-center flex-col sm:px-10'>
                    <div className='relative h-[50vh] w-full flex items-center'>
                        <video 
                            playsInline 
                            id='exploreVideo' 
                            className='w-full h-full object-cover object-center' 
                            muted 
                            autoPlay 
                            ref={videoRef} 
                            preload='none'
                        >
                            <source src={exploreVideo} type="video/mp4" />
                        </video>
                    </div>
                    <div className='flex flex-col w-full relative'>
                        <div className='feature-video-container'>
                            <div className='overflow-hidden flex-1 h-[50vh]'>
                                <img src={explore1Img} alt="titanium" className='feature-video g_grow' />
                                  
                            </div>
                            <div className='overflow-hidden flex-1 h-[50vh]'>
                                 <img src={explore2Img} alt="titanium" className='feature-video g_grow' />
                            </div>
                        </div>
                        <div className='feature-text-container md:flex-row'>
                            <div className='flex-1 flex justify-center'>
                            <p className='feature-text g_text'>
                                iPhone 15 Pro is {" "}
                                <span className='text-white'>
the first iphone to feature an aerospace-grade titanium design, 
                                </span>
                                using the same alloy that spacecraft use for mission to Mars.
                            </p>
                            </div>
                             <div className='flex-1 flex justify-center'>
                            <p className='feature-text g_text'>
                                iPhone 15 Pro is {" "}
                                <span className='text-white'>
the first iphone to feature an aerospace-grade titanium design, 
                                </span>
                                using the same alloy that spacecraft use for mission to Mars.
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features