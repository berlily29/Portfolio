
//for menu
var menu =  document.querySelector('.menu');
var navbar = document.querySelector('.navbar');
var menuimg = document.querySelector('.menu2');
var toggleMenu = true;
var header1 = document.querySelector('.header1');
var header2 = document.querySelector('.header2');


window.addEventListener('resize',()=> {location.reload()});

window.addEventListener('load', ()=> {
    header1.style.opacity = '1';
    header2.style.opacity = '1';

})

menu.addEventListener("click", () =>{
    if (toggleMenu == true) {
        toggleMenu = false
        navbar.style.display = 'flex';
        

        setTimeout(() => {
            menuimg.src = 'css/assets/exit.png';
            navbar.style.opacity = '1';
            navbar.style.height ='80vh';
    
        }, 100);

    }
    else if (toggleMenu == false) {
        toggleMenu = true;

        menuimg.src = 'css/assets/menu.png'
        setTimeout(() => {
            navbar.style.height ='0vh';
            }, 100);

    }
    else {
        console.log('error');
    }

});


let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

