
var nav = document.querySelector('.nav');
var navmobile = document.querySelector('#navmobile');
var navicon = document.querySelector('#navicon')

window.addEventListener('scroll',() => {
    var scroll = window.scrollY

    if (scroll < 20) {
        nav.style.backgroundColor = '#0e1c01' 
    }
    else {
        nav.style.backgroundColor = 'var(--navbgcolor)'
    }
})

var toggled = false
navmobile.addEventListener('click', ()=> {
        
        if (toggled == false) {
        toggled = true;
        navicon.src = 'css/assets/goback.png';
        nav.style.height = '70%'; }
        else {
            toggled = false;
            navicon.src = 'css/assets/menu.png';
            nav.style.height = '0%';
        }


});
