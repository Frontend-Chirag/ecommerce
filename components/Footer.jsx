import React from 'react';
import { AiFillTwitterSquare,AiOutlineInstagram,AiOutlineFacebook,AiOutlineWhatsApp } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer-container'>
      <h4>2023 JUNGLECart All rights Reserved </h4>
      <p className='icons'>Let's go Social</p>
      <p className='icons'>
        
        <AiFillTwitterSquare/>
        <AiOutlineFacebook/>
        <AiOutlineInstagram/>
        <AiOutlineWhatsApp/>
      </p>

    </div>
  )
}

export default Footer