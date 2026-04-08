// const menu = document.querySelector('#mobile-menu');
// const menuLinks = document.querySelector('.nav-links');

// menu.addEventListener('click', function() {
//   // Toggle the 'active' class on the ul
//   menuLinks.classList.toggle('active');
  
//   // Optional: Animate the hamburger to an 'X'
//   menu.classList.toggle('is-active');
// });

gsap.from("#view1 h1", {
  y: 50,
  opacity: 0,      // Starts invisible and fades in
  duration: 2,
  delay: 1,
  stagger: 0.4,    // Removed the 'ed'
  yoyo: true,
  
});
let reveal = document.querySelector(".reveal");
let forward = document.querySelector(".forward");
let cross = document.querySelector(".reveal .cross");

var t1 = gsap.timeline({ paused: true });

// 1. Slide the menu in
t1.to(reveal, {
  x: "-100%", 
  duration: 0.5,
  ease: "power2.inOut"
});

// 2. Animate the text links
t1.from(".reveal h2", {
  opacity: 0,
  x: 30,
  duration: 0.4,
  stagger: 0.1,
  ease: "power1.out"
});
t1.from(cross,{
  x:30,
  opacity:0,
  ease:"power1,out",
  duration:0.3
})

forward.addEventListener("click", () => {
  t1.play();
});

cross.addEventListener("click", () => {
  t1.reverse();
});
let view2 = document.querySelector("#view2");

// Define ScrollTrigger inside the timeline object
var t2 = gsap.timeline({
  scrollTrigger: {
    trigger: view2,
    start: "top 20%",   // Jab section top se 40% niche hoga, animation start hogi
    end: "top -100%",   
    scrub: 2,           
    pin: true,          
   scroller:"body",

  }
});


// Text reveal animation
t2.from("#view2 .text h2", {
  y: -40,
  opacity: 0,
  stagger: 0.3,
  duration: 0.6
});

// Purani image ko fade out karo
t2.to("#view2 img", {
  opacity: 0,
  duration: 0.5
});

// Image source change karo (attr: { src: "..." })
t2.to("#view2 img", {
  attr: { src: "anand.jpeg" }, // lowercase 'attr' use karein
  duration: 0 // Turant change karne ke liye
});

// Nayi image ko wapas fade in karo
t2.to("#view2 img", {
  opacity: 1,
  duration: 0.5
});