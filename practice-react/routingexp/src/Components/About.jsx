import React from 'react';
import { Link } from 'react-router-dom';

const About = (props) => {
    console.log(props.name)
    return (
        <h1>Hello {props.name}</h1> 
       
        );
}
 
export default About;