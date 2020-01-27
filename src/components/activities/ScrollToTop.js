import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const toTheTop = () => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <button onClick={toTheTop} id="topBtn" title="Go to top" style={btnStyle}>
      <i href="#top" className="fas fa-arrow-alt-circle-up fa-2x" />
    </button>
  );
};

const btnStyle = {
  display: "none" /* Hidden by default */,
  position: "fixed" /* Fixed/sticky position */,
  bottom: "1rem" /* Place the button at the bottom of the page */,
  right: "1rem" /* Place the button 30px from the right */,
  cursor: "pointer" /* Add a mouse pointer on hover */,
  border: "none" /* Remove borders */,
  borderRadius: "10px" /* Rounded corners */,
  padding: "0.2rem",
  backgroundColor: "#4ac7c2"
};

export default ScrollToTop;
