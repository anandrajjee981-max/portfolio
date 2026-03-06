const hamburger = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  // Toggle the menu
  navMenu.classList.toggle('active');
  
  // Optional: Animate hamburger into an 'X'
  hamburger.classList.toggle('is-active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links li').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});
let hi = document.querySelector(".hi");
let character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
let text = hi.innerText;
let iteration = 0;

function swap() {
  let result = text.split("").map((char, index) => {
    if (index < iteration) {
      return char;
    }
    return character[Math.floor(Math.random() * character.length)];
  }).join("");

  hi.innerText = result;
  iteration += 0.25;
}

setInterval(swap, 30);