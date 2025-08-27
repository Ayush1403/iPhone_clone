import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap"
import { right, watch } from "../utils"
import VideoCarousel from './VideoCarousle';

const Highlights = () => {

  gsap.registerPlugin(ScrollTrigger)
  useGSAP(() => {
    gsap.to('#title', { opacity: 1, y: 0 })
    gsap.to('.link', { opacity: 1, y: 0, duration: 1, stagger: 0.25 })
  }, [])

  return (
    <section id="highlights" className=" common-padding bg-znc">
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="title" className="section-heading">Get the highlights.</h1>

          <div className="flex flex-wrap items-end gap-5">
            <a href="https://www.youtube.com/watch?v=Ailqbh9V73M" className="link decoration-0">
           
              Watch the film
              <img src={watch} alt="watch" className="ml-2" />
            
            </a>
           <a href="https://www.youtube.com/watch?v=ZiP1l7jlIIA" className=" decoration-0">
            <p className="link">
              Watch the event
              <img src={right} alt="right" className="ml-2" />
            </p>
           </a>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  )
}

export default Highlights