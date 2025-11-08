fetch("./Pasta.json").then((response)=>response.json()).then(data=>{
    
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
    
    let recipeCardWrapper = document.querySelector('#recipeCardWrapper');
    
    function showCards(arrayCard){
        
        recipeCardWrapper.innerHTML='';
        
        arrayCard.forEach((recipe, i)=>{
            
            let difficulty = "";
            
            switch(recipe.difficulty) {
                case "easy":
                difficulty = `<i class="fa-solid fa-star fa-sm"></i>`;
                break;
                
                case "medium":
                difficulty = `<i class="fa-solid fa-star fa-sm"></i>
                             <i class="fa-solid fa-star fa-sm"></i>`;
                break;
                
                case "hard":
                difficulty = `<i class="fa-solid fa-star fa-sm"></i>
                             <i class="fa-solid fa-star fa-sm"></i>
                             <i class="fa-solid fa-star fa-sm"></i>`;
                break;
            }
            
            let cost = "";
            
            switch(recipe.price) {
                case "cheap":
                cost = `<i class="fa-solid fa-dollar-sign fa-sm"></i>`;
                break;
                
                case "medium":
                cost = `<i class="fa-solid fa-dollar-sign fa-sm"></i>
                        <i class="fa-solid fa-dollar-sign fa-sm"></i>`;
                break;
                
                case "expensive":
                cost = `<i class="fa-solid fa-dollar-sign fa-sm"></i>
                        <i class="fa-solid fa-dollar-sign fa-sm"></i>
                        <i class="fa-solid fa-dollar-sign fa-sm"></i>`;
                break;
            }
            
            let div = document.createElement('div');
            div.classList.add('recipe-card-custom');
            div.innerHTML=`
                <div class="row">
                        
                        <div class="col-12 col-md-3">
                            <img class="recipe-card-img" src="https://picsum.photos//${300+i}" alt="immagine di ricetta">
                        </div>
                        <div class="col-12 col-md-9 recipe-description text-center text-md-start pt-4 pt-md-1">
                            <p class="h1">${recipe.name}</p>
                            <div class="h3">Difficoltà: ${difficulty}</div>
                            <div class="h3">Costo: ${cost}</div>
                            <p class="lead">${recipe.ingredients}</p>
                        </div>
                    </div>
            `;
            
            recipeCardWrapper.appendChild(div);
        });
        
    };

    showCards(data);
    
})