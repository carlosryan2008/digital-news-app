'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import './Header.css';
import logo from '../app/logo.png';
import Nav from './Nav';
import Sci from './Sci';

export default function Header() {

  const [open, setOpen] = useState(false)
  const [on, setOn] = useState (false)

  const handleToggleMenu = () => {
    setOn(!on)
    let body: HTMLElement | any = document.querySelector('body')
    body.classList.toggle('mobile-nav-active')
  }


  const handleFormOpen = (e: Event | any) =>{
    e.preventDefault();
    setOpen(!open)
  }
  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
          <Image src={logo} alt="Logo" width={100} height={100} quality={100}/>
    
        </a>
        <Nav/>
        <div className="position-relative">
          <Sci/>
          

        </div>
      </div>
    </header>
  );
}