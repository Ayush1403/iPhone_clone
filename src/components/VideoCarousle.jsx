import React, { useRef, useEffect, useState } from 'react';
import { highlightVids } from '../constants';
import { pauseImg, playImg, replayImg } from '../utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider",{
        transform: `translateX(${-100 * videoId}%)`,
        duration: 2,
        ease:'power2.inOut'
    })

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none"
      },
      onComplete: () => {
        setVideo((prevVideo) => ({
          ...prevVideo,
          startPlay: true,
          isPlaying: true,
        }));
      }
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId]?.pause();
      } else {
        startPlay && videoRef.current[videoId]?.play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                    ? "10vw"
                    : "4vw",
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          gsap.to(videoDivRef.current[videoId], {
            width: '12px',
          });

          gsap.to(span[videoId],{
            backgroundColor: '#afafaf'
          })
        },
      });

      if(videoId==0){
        anim.restart();
      }
const animUpdate = () =>  {
        anim.progress(videoRef.current[videoId].currentTime / highlightVids[videoId].videoDuration)
      }
    if(isPlaying){
        gsap.ticker.add(animUpdate)
    }
    else{
        gsap.ticker.remove(animUpdate)
    }
      
    }

  }, [videoId, startPlay]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prevVideo) => ({ ...prevVideo, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo({
          isEnd: false,
          startPlay: true,
          videoId: 0,
          isLastVideo: false,
          isPlaying: true,
        });
        videoRef.current[0]?.play();
        break;
      case "play":
        setVideo((prevVideo) => ({ ...prevVideo, isPlaying: true }));
        break;
      case "pause":
        setVideo((prevVideo) => ({ ...prevVideo, isPlaying: false }));
        break;
      default:
        return video;
    }
  };

  const handleLoadedMetadata = (i, e) =>
    setLoadedData((prevVideo) => [...prevVideo, e]);

  return (
    <>
      <div className="flex items-center">
        {highlightVids.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex justify-center rounded-3xl overflow-hidden bg-black relative">
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                    className={`${
                    list.id === 2 && "translate-x-44"
                  } pointer-events-none`}
                  ref={(el) => (videoRef.current[i] = el)}
                  onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                  onPlay={() =>
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }))

                    
                  }

                  onEnded={()=>
                    i !== 3
                    ? handleProcess('video-end',i)
                    : handleProcess('video-last')
                  }
                 
                >
                  <source src={list.video} type="video/mp4" />
                </video>
                <div className="absolute top-12 left-[5%] z-10">
                  {list.textLists.map((text, index) => (
                    <p key={index} className="md:text-2xl text-xl font-medium">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex justify-center mt-10">
        <div className="flex justify-center py-5 px-7 bg-secondry-400 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="mx-2 w-3 h-3 bg-secondry-300 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                  ? () => handleProcess("play")
                  : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
