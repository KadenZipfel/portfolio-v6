var up = document.querySelector('.up');

window.onscroll = function() {
  if(window.pageYOffset > 200) {
    up.style.opacity = "1";
  } else {
    up.style.opacity = "0";
  }
}