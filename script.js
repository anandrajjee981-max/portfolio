

//  VIEW 1 (Hero Animation)
gsap.from("#view1 h1", {
  y: 50,
  opacity: 0,
  duration: 1.2,
  stagger: 0.3,
  
  yoyo: true
});

// MENU REVEAL 
const reveal = document.querySelector(".reveal");
const forward = document.querySelector(".forward");
const cross = document.querySelector(".reveal .cross");

const t1 = gsap.timeline({ paused: true });

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


if (forward && cross) {
  forward.addEventListener("click", () => t1.play());
  cross.addEventListener("click", () => t1.reverse());
}


const view2 = document.querySelector("#view2");
const view2Img = document.querySelector("#view2 img");
const view2Text = document.querySelectorAll("#view2 .text h2");

const newImg = "anand.jpeg"; //hard coded image nhi aaye isley yha variable mein define kiye 

const t2 = gsap.timeline({
  scrollTrigger: {
    trigger: view2,
    start: "top 20%",
    end: "top -100%",
    scrub: 2,
    pin: true,
    scroller: "body"
  }
});

// Text reveal
t2.from(view2Text, {
  y: -40,
  opacity: 0,
  stagger: 0.3,
  duration: 0.6
})

// Fade out old image
.to(view2Img, {
  opacity: 0,
  duration: 0.5
})

// Change image
.set(view2Img, {
  attr: { src: newImg }
})

// Fade in new image
.to(view2Img, {
  opacity: 1,
  duration: 0.5
});


const img1 = document.querySelector("#view3 img");

const images = [
  "https://i.pinimg.com/736x/da/30/69/da30697068c26ddb9d9aa603889480d9.jpg",
  "https://i.pinimg.com/1200x/06/ae/80/06ae800957fd7efabe894de3d1c0611b.jpg",
  "https://i.pinimg.com/736x/69/16/e2/6916e2b11f37661b5ba69a422c49460c.jpg",
  "https://i.pinimg.com/736x/75/2d/35/752d355450895f613ebef5b3d9c2a0e9.jpg",
  "https://i.pinimg.com/736x/7f/d8/ae/7fd8ae75fbf4343a8814ebeb31e89099.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiveycOrxg_87ptVrOKT9j6OatggrM1DsOYA&s",
  "https://i.pinimg.com/736x/44/59/32/4459321c4e61adc58c584aa00788d148.jpg",
  "https://i.pinimg.com/736x/cf/5f/7d/cf5f7dca8d30d52a39f4043f3796d7f0.jpg"
];

// Timeline (paused for performance control)
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


ScrollTrigger.create({  //yhe wala isley lga kyoki yey agr nhi rehta too infinite loop 
// main chlta jo cpu k liye thik nhi isly jbb user iss page pay aaye tbb hee yee kaam kree
  trigger: "#view3",
  onEnter: () => t3.play(),
  onLeave: () => t3.pause(),
  onEnterBack: () => t3.play(),
  onLeaveBack: () => t3.pause()
});