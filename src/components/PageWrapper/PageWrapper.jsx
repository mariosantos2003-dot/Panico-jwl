// components/PageWrapper.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

const PageWrapper = ({ children }) => {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    });

    return () => ctx.revert(); // Limpia al desmontar
  }, []);

  return <div ref={containerRef}>{children}</div>;
};

export default PageWrapper;
