let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;
//SIDE NAV
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})


$(".toggle-icon").on('click',function(){
    if ($(".side-nav").css('left') == '0px'){
        closeSideNav()
    }else{
        openSideNav()
    }
})




// ============== Functions ===============
closeSideNav()
function openSideNav(){
    $('.side-nav').animate({left:0},500)
    $('.toggle-icon').removeClass('fa-bars');
    $('.toggle-icon').addClass('fa-x');
    for(let i=0;i<5;i++){
        $(".links li").eq(i).animate({top: 0}, (i + 5) * 100)
    }
}

function closeSideNav(){
    let boxWidth= $(".nav-links").innerWidth(); 
    $('.side-nav').animate({left:-boxWidth},500)
    $('.toggle-icon').addClass('fa-bars')
    $('.toggle-icon').removeClass('fa-x')
    $(".links li").animate({top: 300}, 500)

}

function displayMeals(arr) {
    let cartona = "";

    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="layer rounded-2 position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartona
}
function displayCategories(arr) {
    let cartona = "";

    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="${arr[i].strCategory}" >
                    <div class="layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartona
}



function displayArea(arr) {
    let cartona = "";
    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartona
}
//!!!!!!!!
function displayIngredients(arr) {
    let cartona = "";
    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3 text-white">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p> 
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartona
}
function displayMealDetails(meal) {
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">
            ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
            </li>`
        }
    }

    let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let cartona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2 class='text-white'>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2 >Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartona
}
function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input oninput="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input oninput="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}
function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInput = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInput = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInput = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInput = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInput = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInput = true
    })
}
//! CALL API 
async function getCategories() {
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let data = await api.json()

    displayCategories(data.categories)
    $(".inner-loading-screen").fadeOut(300)

}


async function getArea() {
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data = await api.json()
    displayArea(data.meals)
    $(".inner-loading-screen").fadeOut(300)

}


async function getIngredients() {
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await api.json()
    displayIngredients(data.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

async function getCategoryMeals(category) {
    $(".inner-loading-screen").fadeIn(300)

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let data= await api.json()


    displayMeals(data.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}


async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

   let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
   let data = await api.json()


    displayMeals(data.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}
async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

   let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
let data = await api.json()


    displayMeals(data.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

async function getMealDetails(mealID) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";
    let api= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    let data = await api.json();

    displayMealDetails(data.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}
//!!!!!!!!!!!!!
async function searchByName(term) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

   let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
let data= await api.json()

    data.meals ? displayMeals(data.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}
//!!!!!!!!!!
async function searchByFLetter(term) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    term == "" ? term = "a" : "";
   let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
let data = await api.json()

    data.meals ? displayMeals(data.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}




let nameInput = false;
let emailInput = false;
let phoneInput = false;
let ageInput = false;
let passwordInput = false;
let repasswordInput = false;



// ========= VALIDATION ==========
function inputsValidation() {
    if (nameInput) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInput) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInput) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInput) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInput) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInput) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}