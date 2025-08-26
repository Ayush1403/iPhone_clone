import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'
import ModelView from './ModelView'
import { yellowImg } from '../utils'
import {models,sizes} from '../constants'
import * as THREE from 'three'
import { animationTimeline } from '../utils/animation'

const Model = () => {
    const [size, setSize] = useState('small');
    const [model, setModel] = useState({
        title: "iPhone15 pro in natural titanium",
        color: ['#8F8A81', '#FFE789', '#6F6C64'],
        img: yellowImg,
    })

    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();

    const small = useRef(new THREE.Group())
    const large = useRef(new THREE.Group())

    const [smallRotation, setsmallRotation] = useState(0)
    const [largeRotation, setlargeRotation] = useState(0)

    const tl = gsap.timeline();

    useEffect(() => {
        if(size === 'large') {
            animationTimeline(
                tl, 
                small, 
                smallRotation, 
                "#view1", 
                "#view2", 
                {
                    transform: 'translateX(-100%)',
                    duration: 2
                }
            )
        }
        if(size === 'small') {
            animationTimeline(
                tl, 
                large, 
                largeRotation, 
                "#view2", 
                "#view1", 
                {
                    transform: 'translateX(0%)',
                    duration: 2
                }
            )
        }
    }, [size])

    useGSAP(() => {
        gsap.to("#heading", {
            opacity: 1,
            duration: 2,
            y: 0
        })
    })

    return (
        <section className="common-padding overflow-hidden">
            <div className=" max-w-screen">
                {/* GSAP heading */}
                <h1
                    id="heading"
                    className="section-heading"
                >
                    Take a Closer look
                </h1>

                {/* 3D model container */}
                <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                    <ModelView
                        index={1}
                        groupRef={small}
                        gsapType="view1"
                        controlRef={cameraControlSmall}
                        setRotationState={setsmallRotation}
                        item={model}
                        size={size}
                        className="absolute top-0 left-0 w-full h-full"
                    />

                    <ModelView
                        index={2}
                        groupRef={large}
                        gsapType="view2"
                        controlRef={cameraControlLarge}
                        setRotationState={setlargeRotation}
                        item={model}
                        size={size}
                        className="absolute top-0 left-0 w-full h-full"
                    />

                    {/* Canvas stays fixed, behind content */}
                    <Canvas className=" w-full h-full"
                    
                    style={
                     { position: 'fixed',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      overflow: 'hidden'
                     }

                    }
                    eventSource={document.getElementById('root')}
                    >

                        <View.Port />
                    </Canvas>
                    
                </div>
                <div className='mx-auto w-full'>
                      <p className='text-sm font-light text-center mb-5'>{model.title}</p>
                    <div className='flex justify-center'>
                      <ul className='color-container'>
                  {models.map((item,i)=>(
                    <li key={i} className='w-6 h-6 rounded-full mx-2 cursor-pointer'
                    style={
                     { backgroundColor: item.color[0]}
                    }
                    onClick={()=>setModel(item)}
                    />
                  ))}
                      </ul>
                      <button className='size-btn-container cursor-pointer'>
                      {sizes.map(({label, value})=>(
                        <span key={label} className='size-btn'
                        style={{
                          backgroundColor: size === value ? 'white' : 'transparent',
                          color:size === value?'black' : 'white'
                        }}
                        onClick={()=>setSize(value)}
                        >
                            {label}
                        
                        </span>
                        
                      ))}
                      </button>
                    </div>
                    </div>
            </div>
        </section>
    )
}

export default Model