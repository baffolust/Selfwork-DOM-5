// selectors Navbar
let navbar = document.querySelector("#navbar");
let navContainer = document.querySelector('#navContainer');
let navLinks = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar');
let navbarToggler = document.querySelector('.navbar-toggler');


// Cambio colore e dimensione alla Navbar con scrolling

window.addEventListener('scroll', ()=>{
    
    let scrolled = window.scrollY;
    if(scrolled > 0){
        navbar.classList.add('bgColor_1');
        navbar.classList.remove('bgColor_2');
        navContainer.classList.add('bgColor_1');
        navContainer.classList.remove('bgColor_2');
        navbar.style.height = '85px';
        
        // Cambio colore Logo NavBar e hamburger Icon
        
        logoNavbar.src = './Media/cookLogo_3.png';
        navbarToggler.style.background = 'var(--bgColor_3)';
        navbarToggler.style.border = '1px solid var(--textColor_3)';
        
        
        navLinks.forEach((navLink)=>{
            
            navLink.style.color = 'var(--bgColor_3)';
        });
        
    }else{
        navbar.classList.add('bgColor_2');
        navbar.classList.remove('bgColor_1');
        navContainer.classList.add('bgColor_2');
        navContainer.classList.remove('bgColor_1');
        navbar.style.height = '130px';
        
        logoNavbar.src = './Media/cookLogo_4.png';
        navbarToggler.style.background = 'var(--bgColor_2)';
        navbarToggler.style.border = '1px solid var(--textColor_4)';
        
        navLinks.forEach((navLink)=>{
            
            navLink.style.color = 'var(--bgColor_4)';
        });
        
    }
    
});
