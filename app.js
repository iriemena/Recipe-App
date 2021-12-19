const randomMeal = document.querySelector(".random-meal");
const popupContainer = document.getElementById("popup-container");
const popup = document.querySelector(".popup");
const mealInfo = document.querySelector(".meal-info");
const favMeal = document.querySelector(".fav-meal");
const search = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

getRandomMeal();
fetchFavMeal();

function getRandomMeal() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMeal(meal);
    });
}

async function getMealById(id) {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const resData = await res.json();
  const meal = resData.meals[0];
  return meal;
}

async function searchByTerm(term) {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const resData = await res.json();
  const meal = resData.meals;
  return meal;
}

function addMeal(mealData) {
  const mealDIV = document.createElement("div");

  mealDIV.innerHTML = `
    <h3 style="font-size: 14px">Recipe of the day</h3>
    <img id="image"
    src=${mealData.strMealThumb}
    alt=${mealData.strMeal} 
    />
    <div class="meal-dtl">
    <p style="margin-left: 5px">${mealData.strMeal} <span><i class="fa fa-heart" aria-hidden="true"></i></span></p>
    </div>
`;

  const mealImg = mealDIV.querySelector("img");

  mealImg.addEventListener("click", () => {
    getMealInfo(mealData);
  });
  randomMeal.appendChild(mealDIV);

  const love = mealDIV.querySelector("span").firstChild;

  love.addEventListener("click", () => {
    if (love.classList.contains("active")) {
      removeLocalMeal(mealData.idMeal);
      love.classList.remove("active");
    } else {
      setLocalMeal(mealData.idMeal);
      love.classList.add("active");
    }
    fetchFavMeal();
  });
}

function setLocalMeal(mealId) {
  const localMealId = getLocalMeal();
  localStorage.setItem("FavMeal", JSON.stringify([...localMealId, mealId]));
}

function removeLocalMeal(mealId) {
  const localMealId = getLocalMeal();
  localStorage.setItem(
    "FavMeal",
    JSON.stringify(localMealId.filter((id) => id != mealId))
  );
}

function getLocalMeal() {
  const localMealId = JSON.parse(localStorage.getItem("FavMeal")) || [];
  return localMealId;
}

// fetch fav meal
async function fetchFavMeal() {
  favMeal.innerHTML = "";

  const localMealId = getLocalMeal();
  for (i = 0; i < localMealId.length; i++) {
    const mealIds = localMealId[i];

    const mealId = await getMealById(mealIds);
    addFavMeal(mealId);
  }
}

// add fav meal
function addFavMeal(mealId) {
  const favLI = document.createElement("li");
  favLI.innerHTML = `
          
          <img
              src=${mealId.strMealThumb}
              alt=${mealId.strMeal}
          />
    
          <i class="fa fa-times clear" aria-hidden="true">
   `;
  const clear = favLI.querySelector(".clear");

  clear.addEventListener("click", (e) => {
    removeLocalMeal(mealId.idMeal);
    fetchFavMeal();
  });

  favLI.addEventListener("click", () => {
    getMealInfo(mealId);
  });

  favMeal.appendChild(favLI);
}

// meal information
function getMealInfo(info) {
  mealInfo.innerHTML = "";

  const ingredient = [];

  for (i = 1; i <= 20; i++) {
    if (info["strIngredient" + i]) {
      ingredient.push(
        `${info["strIngredient" + i]} ~ ${info["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }
  const mealInfoDiv = document.createElement("div");
  mealInfoDiv.innerHTML = `
          <h2>${info.strMeal}</h2>
          <img src="${info.strMealThumb}" alt="${info.strMeal}" />

           <h3>Ingredient/Measure:</h3>   
      <ul>
      ${ingredient.map((ing) => `<li>${ing}</li>`).join("")}
      </ul>
          <div>
           <h3>Instruction:</h3>
            <p>
             ${info.strInstructions}
            </p>
        <a id="youtube" href="${
          info.strYoutube
        }" target="_blank">Watch The Youtube Video</a>
          </div>
      
        `;

  mealInfo.appendChild(mealInfoDiv);

  // show meal info
  popupContainer.classList.remove("hidden");
}

// search by name
searchBtn.addEventListener("click", async () => {
  randomMeal.innerHTML = "";
  const input = search.value;
  const mealsSearch = await searchByTerm(input);
  if (input) {
    mealsSearch.forEach((meal) => {
      addMeal(meal);
    });
  }
});

// To close details of the meal
const popupClose = document.querySelector(".popup-close");
popupClose.addEventListener("click", () => {
  popupContainer.classList.add("hidden");
});
