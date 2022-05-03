import * as React from 'react';
import './NavBar.scss'

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useScroll } from '../useScroll';
import { useCallback } from 'react';

export default function NavBar() {
  const { scrollDir, yNow } = useScroll()
  let showNav = ''
  if (yNow === 0) {
    showNav = 'dark-background'
  } else {
    if (yNow > 350) {
      showNav = 'hidden'
    } else {
      showNav = 'shadow'
    }
  }
  
  
  return (
    <div className='Navbar'>
      <div className='navbar-container'>
        <header className={showNav+ ' background' }>
          dddddddddddddd
        </header>
      </div>
    </div>
  );
}
