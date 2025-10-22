/**
 * Custom JavaScript for Portfolio
 * 
 * Features:
 * 
 */

// Global Variables
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");
let idleTimer = null;
const IDLE_DELAY_MS = 1800;


/**
 * Parallax effect on mouse move for elements with class 'layer'
 * 
 * Adds a dynamic parallax effect to elements with the class 'layer' based on mouse movement.
 * The effect creates a sense of depth by moving layers at different speeds relative to the cursor position.
 * @ param {MouseEvent} e - The mousemove event object
 */

 document.addEventListener("mousemove", (e) => {
      const layers = document.querySelectorAll(".layer");
      if(!layers.length) return; // Exit if no layers found

      // Calculate mouse position relative to the center of the screen
      const x = (e.clientX / window.innerWidth - 0.5) * 80;
      const y = (e.clientY / window.innerHeight - 0.5) * 80;

      // Apply transform to each layer based on its index
      layers.forEach((layer, index) => {
        const speed = (index + 1) * 4;
        layer.style.transform = `translate(${x / speed}px, ${y / speed}px) scale(1.05)`;
      });

      if(navbar) navbar.style.top = "0";
      resetIdleTimer();
    });

/** *Navbar scroll behavior
 * 
 * Hides the navbar when scrolling down and shows it when scrolling up.
 * This improves user experience by maximizing screen space while navigating the page.
 */



window.addEventListener("scroll", () => {
  if (!navbar) return;

  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop){
    navbar.style.top = "-100px"; // Hide navbar on scroll down
  } else {
    navbar.style.top = "0"; // Show navbar on scroll up
  }

  navbar.style.transition = "top 0.4s";
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // prevents negative scrolling

  resetIdleTimer();
});

function resetIdleTimer() {
  if (!navbar) return;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    navbar.style.top = "-100px";
  }, IDLE_DELAY_MS);
}