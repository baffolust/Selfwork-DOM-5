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
    
    // Funzione per mostrare le card
    function showCards(arrayCard){
        
        recipeCardWrapper.innerHTML='';
        arrayCard.forEach((recipe, i)=>{
        
            // Traduco stringhe in icone, sia per difficoltà che per costo
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

    let wordInput = document.querySelector('#wordInput');
    let radioDifficultyButtons = document.querySelectorAll('.radioDifficulty');
    let radioPriceButtons = document.querySelectorAll('.radioPrice');

    // console.log(radioPriceButtons);
    

    function filterByTitle(arrayRecipes){

        let filtered = arrayRecipes.filter((recipe)=>recipe.name.toLowerCase().includes(wordInput.value.toLowerCase()));
        return filtered;
    };

    wordInput.addEventListener('input', ()=> globalFilter());

    function numericDifficulty(difficulty){

        let difficultyNumber = 0;
        switch(difficulty){
                case "easy":
                difficultyNumber = 1;
                break;
                
                case "medium":
                difficultyNumber = 2;
                break;
                
                case "hard":
                difficultyNumber = 3;
                break;
            }
        return difficultyNumber;
    };

    function filterByDifficulty(arrayRecipes){

        let itemDifficulty = numericDifficulty(Array.from(radioDifficultyButtons).find((button)=>button.checked).id);

        // console.log(itemDifficulty);
        
        let filtered = arrayRecipes.filter((recipe)=>
            numericDifficulty(recipe.difficulty) <= itemDifficulty);

        return filtered;
        
    };

    // console.log(radioDifficultyButtons);

    
    radioDifficultyButtons.forEach((button)=>{
        button.addEventListener('click',()=>globalFilter());
        

    });

    function numericPrice(price){

        let priceNumber = 0;
        switch(price){
                case "cheap":
                priceNumber = 1;
                break;
                
                case "average":
                priceNumber = 2;
                break;
                
                case "expensive":
                priceNumber = 3;
                break;
            }
        return priceNumber;
    };

    function filterByPrice(arrayRecipes){

        let itemPrice = numericPrice(Array.from(radioPriceButtons).find((button)=>button.checked).id);

        console.log(itemPrice);
        
        let filtered = arrayRecipes.filter((recipe)=>
            numericPrice(recipe.price) <= itemPrice);

        return filtered;
        
    };

    radioPriceButtons.forEach((button)=>{
        button.addEventListener('click',()=>globalFilter());
    });

    function globalFilter(){
        let filteredByTitle = filterByTitle(data);
        let filteredByDifficulty = filterByDifficulty(filteredByTitle);
        let filteredByPrice = filterByPrice(filteredByDifficulty);
        showCards(filteredByPrice);
    }
    
})