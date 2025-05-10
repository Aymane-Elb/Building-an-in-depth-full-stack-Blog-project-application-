import React, { useState, useRef, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function GsapButton({ 
  text, 
  darkMode = true, 
  to = null, 
  onClick = null, 
  className = "",
  disabled = false
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mouseEnterPosition, setMouseEnterPosition] = useState(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  
  // Utilisation de useCallback pour éviter des re-rendus inutiles
  const handleMouseEnter = useCallback((e) => {
    if (disabled) return;
    
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const mouseX = e.clientX - buttonRect.left;
    const buttonWidth = buttonRect.width;
    const enteredFromRight = mouseX > buttonWidth / 2;
    
    setMouseEnterPosition(enteredFromRight ? 'right' : 'left');
    setIsHovered(true);
  }, [disabled]);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  
  const handleClick = useCallback((e) => {
    if (disabled) return;
    
    if (onClick) {
      onClick(e);
    }
    
    if (to) {
      navigate(to);
    }
  }, [onClick, to, navigate, disabled]);
  
  // Classes conditionnelles
  const baseClasses = darkMode
    ? "relative overflow-hidden border border-yellow-400 text-black rounded-full py-1 px-4 font-medium transition-colors duration-300"
    : "relative overflow-hidden border border-white text-yellow-400 rounded-full py-1 px-4 font-medium transition-colors duration-300";
    
  const hoverTextClass = darkMode ? "text-black" : "text-white";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <button
      ref={buttonRef}
      className={`${baseClasses} ${isHovered ? hoverTextClass : ""} ${disabledClass} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled}
      type="button"
    >
      {/* Background animation overlay */}
      <span
        className={`absolute inset-0 z-0 ${darkMode ? "bg-yellow-300" : "bg-white"} transform origin-right transition-transform duration-300 ease-out`}
        style={{
          transformOrigin: mouseEnterPosition === 'right' ? 'right' : 'left',
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
        }}
        aria-hidden="true"
      />
      
      {/* Button text (stays on top) */}
      <span className="relative z-10">{text}</span>
    </button>
  );
}

// Validation des props avec PropTypes
GsapButton.propTypes = {
  text: PropTypes.string.isRequired,
  darkMode: PropTypes.bool,
  to: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

// Utilisation de memo pour éviter les rendus inutiles
export default memo(GsapButton);