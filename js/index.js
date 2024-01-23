







//for menu
var menu =  document.querySelector('.menu');
var navbar = document.querySelector('.navbar');
var menuimg = document.querySelector('.menu2');
var toggleMenu = true;



menu.addEventListener("click", ()=> {
    if (toggleMenu == true ) {
        toggleMenu = false
        navbar.style.display = 'flex';

        setTimeout(() => {
            menuimg.src = 'css/assets/exit.png';
            navbar.style.opacity = '1';
    
        }, 100);

    }
    else if (toggleMenu == false) {
        toggleMenu = true;
        navbar.style.opacity = '0';
        menuimg.src = 'css/assets/menu.png'
        setTimeout(() => {
            navbar.style.display = 'none';
            }, 100);

    }
    else {
        console.log('error');
    }

});

