import * as $ from "jquery";

$(document).ready(function() {
  // Add smooth scrolling to all links
  $("a").on("click", function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top
        },
        800,
        function() {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });

  /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    // When the user scrolls down 20px from the top of the document, show the button
    scrollFunction();
  };

  // To the top button
  //Get the button:
  const buttonToTop = document.getElementById("topBtn");

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      buttonToTop.style.display = "block";
    } else {
      buttonToTop.style.display = "none";
    }
  }

  const menuButton = document.querySelector(".menu-btn");
  const menu = document.querySelector(".menu");
  const menuNav = document.querySelector(".menu-nav");
  const menuBranding = document.querySelector(".menu-branding");
  const navItems = document.querySelectorAll(".nav-item"); //puts all items in an array
  const navMenuItems = document.querySelectorAll(".nav-menu-item"); //puts all items in an array
  const siteMenu = document.querySelector(".site-menu");
  const body = document.body;

  // Set Initial State of Menu

  let showMenu = false; //let can be reassigned at any time

  menuButton.addEventListener("click", toggleMenu);
  navMenuItems.forEach(item => item.addEventListener("click", toggleMenu));

  function toggleMenu() {
    if (!showMenu) {
      menuButton.classList.add("close");
      menu.classList.add("show");
      menuNav.classList.add("show");
      menuBranding.classList.add("show");
      navItems.forEach(item => item.classList.add("show")); //each item in nav gets show function
      body.scroll = "no";
      body.style.overflow = "hidden";

      //Set Menu State
      showMenu = true;
    } else {
      menuButton.classList.remove("close");
      menu.classList.remove("show");
      menuNav.classList.remove("show");
      menuBranding.classList.remove("show");
      navItems.forEach(item => item.classList.remove("show")); //each item in nav gets show function
      body.scroll = "yes";
      body.style.overflow = "visible";
      //Set Menu State
      showMenu = false;
    }
  }

  // Collapsible for discography bios

  let myLabels = document.querySelectorAll(".lbl-toggle");

  Array.from(myLabels).forEach(label => {
    label.addEventListener("keydown", e => {
      // 32 === spacebar
      // 13 === enter
      if (e.which === 32 || e.which === 13) {
        e.preventDefault();
        label.click();
      }
    });
  });
});
