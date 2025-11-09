fetch("./Chefs.json").then((response)=>response.json()).then(data=>{
    
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
    
    
    let swiperWrapper = document.querySelector('.swiper-wrapper');
    
    // creo immagini swiper
    
    function createSwiper(arrayChefs){
        
        arrayChefs.forEach((chef)=>{
            
            let div = document.createElement('div');
            div.classList.add('swiper-slide');
            div.innerHTML=`<img src=${chef.imgURL}/>`;
            
            swiperWrapper.appendChild(div);
        });
    };
    
    createSwiper(data);

    let swiperSliders = document.querySelectorAll('.swiper-slide');
    let detailsWrapper = document.querySelector('#detailsWrapper');

    //funzione che aggiunge la descrizione della slide attiva
    function addSlideDescription(swiperSlide){

        detailsWrapper.innerHTML='';
        let indexActiveSlide = Array.from(swiperSliders).indexOf(swiperSlide);
        console.log(indexActiveSlide);
        let div = document.createElement('div');
        div.classList.add('slide-description','text-center');
        div.innerHTML=`
                <p class="h1">${data[indexActiveSlide].nome}</p>
                <p class="h2">${data[indexActiveSlide].anniEsperienza} anni di esperienza in ${data[indexActiveSlide].specialita}</p>
                <p class="h4">${data[indexActiveSlide].curiosita}</p>
        `;
        
        detailsWrapper.appendChild(div);

    }

    let observer = new MutationObserver((mutation)=>{

        let activeSlide = document.querySelector('.swiper-slide-active');
        if(activeSlide){
            addSlideDescription(activeSlide);
        }

    });

    observer.observe(swiperWrapper, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });

    
    // SWIPER
    
    const swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 20,
            modifier: 2,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });
    
});