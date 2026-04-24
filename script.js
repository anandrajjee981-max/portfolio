// ================= INTRO TEXT SPLIT =================
const introElement = document.querySelector("#view1 .intro");

if (introElement) {
  const introText = introElement.innerText;

  function createMagic() {
    let splitText = introText.split("");
    let halfIndex = Math.floor(splitText.length / 2);
    let clutter = "";

    splitText.forEach((elem, idx) => {
      if (idx < halfIndex) {
        clutter += `<span class="left">${elem}</span>`;
      } else {
        clutter += `<span class="right">${elem}</span>`;
      }
    });

    introElement.innerHTML = clutter;
  }

  createMagic();
}

// ================= GSAP TIMELINE 1 =================
const t0 = gsap.timeline();

// Left + Right together
t0.from("#view1 .left", {
  y: 50,
  opacity: 0,
  stagger: 0.15,
  duration: 0.8,
  ease: "power2.out"
}, "start");

t0.from("#view1 .right", {
  y: 50,
  opacity: 0,
  stagger: -0.15,
  duration: 0.8,
  ease: "power2.out"
}, "start");

// FIXED selector (.my)
t0.from("#view1 .my", {
  y: 50,
  opacity: 0,
  duration: 1.2,
  stagger: 0.3
});


// ================= MENU REVEAL =================
const reveal = document.querySelector(".reveal");
const forward = document.querySelector(".forward");
const cross = document.querySelector(".reveal .cross");

const t1 = gsap.timeline({ paused: true });

if (reveal) {
  t1.to(reveal, {
    x: "-100%",
    duration: 0.5,
    ease: "power2.inOut"
  })
  .from(".reveal h2", {
    opacity: 0,
    x: 30,
    duration: 0.4,
    stagger: 0.1,
    ease: "power1.out"
  })
  .from(cross, {
    x: 30,
    opacity: 0,
    duration: 0.3,
    ease: "power1.out"
  });
}

if (forward && cross) {
  forward.addEventListener("click", () => t1.play());
  cross.addEventListener("click", () => t1.reverse());
}


// ================= VIEW 2 SCROLL =================
const view2 = document.querySelector("#view2");
const view2Img = document.querySelector("#view2 img");
const view2Text = document.querySelectorAll("#view2 .text h2");

const newImg = "anand.jpeg";

if (view2 && view2Img) {
  const t2 = gsap.timeline({
    scrollTrigger: {
      trigger: view2,
      start: "top 20%",
      end: "top -100%",
      scrub: 2,
      pin: true
    }
  });

  t2.from(view2Text, {
    y: -40,
    opacity: 0,
    stagger: 0.3,
    duration: 0.6
  })
  .to(view2Img, {
    opacity: 0,
    duration: 0.5
  })
  .set(view2Img, {
    attr: { src: newImg }
  })
  .to(view2Img, {
    opacity: 1,
    duration: 0.5
  });
}


// ================= VIEW 3 IMAGE LOOP =================
const img1 = document.querySelector("#view3 img");

const images = [
  "https://i.pinimg.com/736x/da/30/69/da30697068c26ddb9d9aa603889480d9.jpg",
  "https://i.pinimg.com/1200x/06/ae/80/06ae800957fd7efabe894de3d1c0611b.jpg",
  "https://i.pinimg.com/736x/69/16/e2/6916e2b11f37661b5ba69a422c49460c.jpg",
  "https://i.pinimg.com/736x/75/2d/35/752d355450895f613ebef5b3d9c2a0e9.jpg",
  "https://i.pinimg.com/736x/7f/d8/ae/7fd8ae75fbf4343a8814ebeb31e89099.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiveycOrxg_87ptVrOKT9j6OatggrM1DsOYA&s",
  "https://i.pinimg.com/736x/44/59/32/4459321c4e61adc58c584aa00788d148.jpg",
  "https://i.pinimg.com/736x/cf/5f/7d/cf5f7dca8d30d52a39f4043f3796d7f0.jpg",
  "https://i.pinimg.com/736x/c9/5b/6c/c95b6c63866e63b5de07117256a320cc.jpg",
  "https://i.pinimg.com/1200x/08/a3/2f/08a32fc73758025add069aefdde61b80.jpg"
];

if (img1) {
  const t3 = gsap.timeline({ repeat: -1, paused: true });

  images.forEach((url) => {
    t3.to(img1, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.in"
    })
    .set(img1, { attr: { src: url } })
    .fromTo(img1,
      { opacity: 0, y: -20, scale: 1.05 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
    )
    .to({}, { duration: 1.5 });
  });

  ScrollTrigger.create({
    trigger: "#view3",
    onEnter: () => t3.play(),
    onLeave: () => t3.pause(),
    onEnterBack: () => t3.play(),
    onLeaveBack: () => t3.pause()
  });
}


// ================= VIEW 5 WHEEL =================
const img = document.querySelectorAll("#view5 .flag .block img");

const flag = document.querySelector("#view5");

const block = document.querySelectorAll("#view5 .flag .block");

let isAnimating = false;

// Ek function banate hain jo direction handle kare
function handleScroll(direction) {
  if (isAnimating) return;
  isAnimating = true;

  if (direction > 0) {
    // SCROLL DOWN / SWIPE UP
    gsap.to(block, { xPercent: -100, duration: 2, repeat: -1, ease: "none" });
    gsap.to(img, { rotate: 180, duration: 0.5, onComplete: () => isAnimating = false });
  } else {
    // SCROLL UP / SWIPE DOWN
    gsap.to(block, { xPercent: 0, duration: 2, repeat: -1, ease: "none" });
    gsap.to(img, { rotate: 0, duration: 0.5, onComplete: () => isAnimating = false });
  }
}

// PC ke liye
window.addEventListener("wheel", (e) => handleScroll(e.deltaY));

// Mobile ke liye (Touch support)
let touchStart = 0;
window.addEventListener("touchstart", (e) => {
  touchStart = e.touches[0].clientY;
});

window.addEventListener("touchmove", (e) => {
  let touchEnd = e.touches[0].clientY;
  let diff = touchStart - touchEnd; // Agar difference positive hai matlab niche scroll ho raha hai
  handleScroll(diff);
});
//my scroll based stcking of card logic
let stack = document.querySelectorAll(".stacking .container .pro");

stack.forEach(function(elem) {
  gsap.to(elem, {
    opacity: 0,
    scale: 0.7,
    stagger: 0.5,
    scrollTrigger: {
      trigger: elem,      // The individual card triggers the animation
      start: "top 15%",   // Starts when the top of the card hits 15% from the top
      end: "bottom 15%",  // Ends when the bottom of the card hits 15%
      scrub: true,
      // markers: true    // Uncomment this to debug the start/end points
    }
  });
});