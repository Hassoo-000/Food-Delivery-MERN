import React from 'react';
import './Footer.css'
import { assets } from '../../assets/assets';
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>

            <div className='footer-content-left'>
                <img className='footer-logo' src= {assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto magni, tempore velit sapiente ex accusamus blanditiis voluptatum illo impedit eius enim! Aperiam necessitatibus quidem a exercitationem quod consequuntur pariatur ducimus.</p>
                <div className='footer-social-icons'>
                    <img src= {assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src= {assets.linkedin_icon} alt="" />
                </div>
            </div>

            <div className='footer-content-center'>
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div className='footer-content-right'>
                <h2>Get in touch</h2>
                <ul>
                    <li>+1-123-456-7890</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
        </div>

        <hr />
        <p className='footer-copyright'> Copyright 2025 &copy; Tomato.com - All Right Reserved.</p>
      
    </div>
  );
}

export default Footer;
