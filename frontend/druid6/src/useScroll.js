import { useState, useEffect } from "react";

export function useScroll() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [bodyOffset, setBodyOffset] = useState(
    document.body.getBoundingClientRect()
  );
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [scrollDirection, setScrollDirection] = useState();

  const listener = e => {
    setBodyOffset(window.bodyOffset);
    setScrollDirection(lastScrollTop > scrollY ? "down" : "up");
    setScrollY(window.scrollY);
    setLastScrollTop(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  return {
    scrollY,
    scrollDirection,
    bodyOffset
  };
}