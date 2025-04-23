import React, { useState, useRef, useEffect } from "react";

export default function GsapButton({ text, darkMode = true }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mouseEnterPosition, setMouseEnterPosition] = useState(null);
  const buttonRef = useRef(null);
  

  const handleMouseEnter = (e) => {
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const mouseX = e.clientX - buttonRect.left;
    const buttonWidth = buttonRect.width;
    

    const enteredFromRight = mouseX > buttonWidth / 2;
    setMouseEnterPosition(enteredFromRight ? 'right' : 'left');
    setIsHovered(true);
  };

  const baseClasses = darkMode 
    ? "relative overflow-hidden border border-yellow-400 text-black rounded-full py-1 px-4 font-medium transition-colors duration-300"
    : "relative overflow-hidden border border-white text-yellow-400 rounded-full py-1 px-4 font-medium transition-colors duration-300";
  
  const hoverTextClass = darkMode ? "text-black" : "text-white";

  return (
    <button
      ref={buttonRef}
      className={`${baseClasses} ${isHovered ? hoverTextClass : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background animation overlay */}
      <span 
        className={`absolute inset-0 z-0 ${darkMode ? "bg-yellow-300" : "bg-white"} transform origin-right transition-transform duration-300 ease-out`}
        style={{
          transformOrigin: mouseEnterPosition === 'right' ? 'right' : 'left',
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)'
        }}
      />
      
      {/* Button text (stays on top) */}
      <span className="relative z-10">{text}</span>
    </button>
  );
}