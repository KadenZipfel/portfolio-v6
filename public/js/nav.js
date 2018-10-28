var menu = document.querySelector('#nav-menu');
var x = document.querySelector('#close-nav');
var right = document.querySelector('.mob-nav__right');
var links = document.querySelectorAll('.mob-nav__right__link');

// Open nav when hamburger is clicked
menu.onclick = () => {
  right.style.display = "flex";
  right.style.animation = ".5s slideleft forwards";
  menu.style.display = "none";
  x.style.display = "flex";
}

// Close nav when x is clicked
x.onclick = () => {
  right.style.animation = ".5s slideright forwards";
  setTimeout(() => {
    right.style.display = "none";
    menu.style.display = "flex";
    x.style.display = "none";
  }, 500);
}

// Close nav when link is clicked
links.forEach((link) => {
  link.onclick = () => {
    right.style.display = "none";
    menu.style.display = "flex";
    x.style.display = "none";
  }
});