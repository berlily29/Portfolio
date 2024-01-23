
//for menu
var menu =  document.querySelector('.menu');
var navbar = document.querySelector('.navbar');
var menuimg = document.querySelector('.menu2');
var toggleMenu = true;

window.addEventListener('resize',()=> {location.reload()});

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