import React, { useEffect } from 'react';
import "./Inter.css"
import  music1 from "./aud1.mp3"
import  music2 from "./aud2.mp3"

const IntersectionDemo = () => {
    let conditionObject = {
        root: null, //observe from whole page
        threshold: "0.8", //80%
      };
      function cb(entries) {
        console.log(entries);

        entries.forEach((entry) => {
          let child = entry.target.children[0];
          // play(); => async
          // pause(); => sync
    
          child.play().then(function () {
            if (entry.isIntersecting == false) {
              child.pause();
            }
          });
        });
      }

    useEffect(()=>{
        let observerObject = new IntersectionObserver(cb, conditionObject);
        let elements = document.querySelectorAll(".audio-container");

        elements.forEach((el) => {
            observerObject.observe(el); //Intersection Observer starts observing each video element
          });
    },[])//will use it as component didmount

    return ( <div >

        <div className="audio-container">
            <Audio src={music1} id="a"></Audio>
        </div>
        <div className="audio-container">
        <Audio src={music2} id="b"></Audio>
        </div>
    </div>);
}

function Audio(props) {
    return (
      <audio className="audio-styles" controls muted={true} id={props.id}>
        <source src={props.src} type="audio/mp3"></source>
      </audio>
    );
  }
export default IntersectionDemo;