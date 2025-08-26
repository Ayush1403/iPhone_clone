import React, { useState,useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ModelView from './ModelView'
import { yellowImg } from '../utils'
import * as THREE from 'three'

const Model = () => {
    const [size,setSize]=useState('small');
    const [model, setModel] = useState(
       { title: "iPhone15 pro in natural titanium",
        colour: ['#8F8A81','#FFE789','#6F6C64'],
        img: yellowImg,
       }
    )


    const cameraControlSmall=useRef();
    const cameraControlLarge=useRef();

    const small= useRef(new THREE.Group())
    const large = useRef(new THREE.Group())

    const [smallRotation, setsmallRotation] = useState(0)
    const [largeRotation, setlargeRotation] = useState(0)

    useGSAP(()=>{
        gsap.to("#heading",{
            opacity: 1,
            duration: 2,
            y: 0
        })
    })
  eturn (
  <section className="common-padding bg-zinc-900 relative">
    <div className="max-w-screen-xl mx-auto relative z-10">
      {/* GSAP heading */}
      <h1
        id="heading"
        className="section-heading opacity-0 translate-y-10 relative z-20"
      >
        Take a Closer look
      </h1>

      {/* 3D model container */}
      <div className="w-full h-[75vh] md:h-[90vh] relative">
        <ModelView
          index={1}
          groupRef={small}
          gsapTyoe="view1"
          controlRef={cameraControlSmall}
          setRotationState={setsmallRotation}
          item={model}
          size={size}
        />

        <ModelView
          index={2}
          groupRef={large}
          gsapTyoe="view2"
          controlRef={cameraControlLarge}
          setRotationState={setlargeRotation}
          item={model}
          size={size}
        />

        {/* Canvas stays fixed, behind content */}
        <Canvas className="fixed inset-0 w-full h-full z-0">
          <View.Port />
        </Canvas>
      </div>
    </div>
  </section>
)
}

export default Model