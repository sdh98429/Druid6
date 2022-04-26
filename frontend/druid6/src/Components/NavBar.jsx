import * as React from 'react';
import './NavBar.scss'

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useScroll } from '../useScroll';

export default function NavBar() {
  const { scrollY, scrollDirection, bodyOffset } = useScroll()

  let temp = ''
  if (scrollY === 0) {
    temp = ''
  } else if (scrollY >= 100) {
    temp = 'hidden'
  } else if (scrollY >= -10) {
    temp = 'shadow'
  }
  console.log(scrollY)
  console.log(scrollDirection)
  console.log(bodyOffset)

  return (
    <div className='Navbar'>
      <div className='navbar-container'>
        <header>
          <div className={temp + ' background' }>
          </div>
          dddddddddddddddd
        </header>
      </div>
    </div>
  );
}
