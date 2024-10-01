import { useState, useEffect } from 'react';

const useScroll = (scrollThreshold = 100) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
    console.log('Vị trí cuộn hiện tại:', window.scrollY);
      if (window.scrollY > scrollThreshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Lắng nghe sự kiện scroll
    window.addEventListener('scroll', handleScroll);

    // Cleanup sự kiện khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold]);

  return isSticky;
};

export default useScroll;
