const randomMeal = document.querySelector(".random-meal");
const modal = document.querySelector(".modal");
const favMeal = document.querySelector(".fav-meal");

getRandomMeal();
fetchFavMeal();

// let interval = setInterval(getRandomMeal, 10000);
function getRandomMeal() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMeal(meal);
      getMealInfo(meal);
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

function addMeal(mealData) {
  randomMeal.innerHTML = `
<div>
    <h3 style="font-size: 14px">Recipe of the day</h3>
    <img id="image"
    src=${mealData.strMealThumb}
    alt=${mealData.strMeal} 
    />
    <div class="meal-dtl">
    <p style="margin-left: 5px">${mealData.strMeal} <span><i class="fa fa-heart" aria-hidden="true"></i></span></p>
    </div>
</div>
`;
  const love = randomMeal.querySelector("span").firstChild;
  love.addEventListener("click", () => {
    if (love.classList.contains("active")) {
      removeLocalMeeal(mealData.idMeal);
      love.classList.remove("active");
    } else {
      setLocalMeeal(mealData.idMeal);
      love.classList.add("active");
    }
    fetchFavMeal();
  });
}

function setLocalMeeal(mealId) {
  const localMealId = getLocalMeal();
  localStorage.setItem("FavMeal", JSON.stringify([...localMealId, mealId]));
}

function removeLocalMeeal(mealId) {
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

async function fetchFavMeal() {
  favMeal.innerHTML = "";
  const localMealId = getLocalMeal();

  for (i = 0; i < localMealId.length; i++) {
    const mealId = localMealId[i];
    const meal = await getMealById(mealId);
    addFavMeal(meal);
  }
}

function addFavMeal(mealId) {
  const ul = document.createElement("ul");
  ul.innerHTML = `
    <li>
          <img
              src=${mealId.strMealThumb}
              alt=${mealId.strMeal}
          />
    </li>
   `;

  favMeal.appendChild(ul);
  console.log(favMeal);
}

// meal information
function getMealInfo(info) {
  modal.innerHTML = `
    <div class="meal-info">
        <i id="close" class="fa fa-times" aria-hidden="true"></i>
        <h2>${info.strMeal}</h2>
        <img src="${info.strMealThumb}" alt="${info.strMeal}" />
        <div>
          <p>
           ${info.strInstructions}
          </p>
     <h3>Instructions</h3>
    <table class="table table-bordered table-sm">
     
        <thead>
            <tr>
                <th scope="col">Meal ID</th>
                <th scope="col">Ingredients</th>
                <th scope="col">Measures</th>
            </tr>
        </thead>
        <tbody style="display: ${info.strIngredient1 ? "" : "none"}">
            <tr>
                <th scope="row">1</th>
                 <td>${info.strIngredient1}</td>
                <td>${info.strMeasure1}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient2 ? "" : "none"}">
            <tr>
                <th scope="row">2</th>
                 <td>${info.strIngredient2}</td>
                <td>${info.strMeasure2}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient3 ? "" : "none"}">
            <tr>
                <th scope="row">3</th>
                 <td>${info.strIngredient3}</td>
                <td>${info.strMeasure3}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient4 ? "" : "none"}">
            <tr>
                <th scope="row">4</th>
                 <td>${info.strIngredient4}</td>
                <td>${info.strMeasure4}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient5 ? "" : "none"}">
            <tr>
                <th scope="row">5</th>
                 <td>${info.strIngredient5}</td>
                <td>${info.strMeasure5}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient6 ? "" : "none"}">
            <tr>
                <th scope="row">6</th>
                 <td>${info.strIngredient6}</td>
                <td>${info.strMeasure6}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient7 ? "" : "none"}">
            <tr>
                <th scope="row">7</th>
                 <td>${info.strIngredient7}</td>
                <td>${info.strMeasure7}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient8 ? "" : "none"}">
            <tr>
                <th scope="row">8</th>
                 <td>${info.strIngredient8}</td>
                <td>${info.strMeasure8}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient9 ? "" : "none"}">
            <tr>
                <th scope="row">9</th>
                 <td>${info.strIngredient9}</td>
                <td>${info.strMeasure9}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient10 ? "" : "none"}">
            <tr>
                <th scope="row">10</th>
                 <td>${info.strIngredient10}</td>
                <td>${info.strMeasure10}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient11 ? "" : "none"}">
            <tr>
                <th scope="row">11</th>
                 <td>${info.strIngredient11}</td>
                <td>${info.strMeasure11}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient12 ? "" : "none"}">
            <tr>
                <th scope="row">12</th>
                 <td>${info.strIngredient12}</td>
                <td>${info.strMeasure12}</td>
            </tr>
        </tbody>
           <tbody style="display: ${info.strIngredient13 ? "" : "none"}">
        <tr>
                <th scope="row">13</th>
                 <td>${info.strIngredient13}</td>
                <td>${info.strMeasure13}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient14 ? "" : "none"}">
            <tr>
                <th scope="row">14</th>
                 <td>${info.strIngredient14}</td>
                <td>${info.strMeasure14}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient15 ? "" : "none"}">
            <tr>
                <th scope="row">15</th>
                 <td>${info.strIngredient15}</td>
                <td>${info.strMeasure15}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient16 ? "" : "none"}">
            <tr>
                <th scope="row">16</th>
                 <td>${info.strIngredient16}</td>
                <td>${info.strMeasure16}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient17 ? "" : "none"}">
            <tr>
                <th scope="row">17</th>
                 <td>${info.strIngredient17}</td>
                <td>${info.strMeasure17}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient18 ? "" : "none"}">
            <tr>
                <th scope="row">18</th>
                 <td>${info.strIngredient18}</td>
                <td>${info.strMeasure18}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient19 ? "" : "none"}">
                <th scope="row">19</th>
                 <td>${info.strIngredient19}</td>
                <td>${info.strMeasure19}</td>
            </tr>
        </tbody>
         <tbody style="display: ${info.strIngredient20 ? "" : "none"}">
            <tr>
                <th scope="row">20</th>
                 <td>${info.strIngredient20}</td>
                <td>${info.strMeasure20}</td>
            </tr>
        </tbody>
        <tbody style="display: ${info.strIngredient21 ? "" : "none"}">
            <tr>
                <th scope="row">21</th>
                 <td>${info.strIngredient21}</td>
                <td>${info.strMeasure21}</td>
            </tr>
        </tbody>
        <tbody style="display: ${info.strIngredient22 ? "" : "none"}">
            <tr>
                <th scope="row">22</th>
                 <td>${info.strIngredient22}</td>
                <td>${info.strMeasure22}</td>
            </tr>
        </tbody>
</table>
            
        </div>
      </div>
      `;

  const image = document.getElementById("image");
  //   To see details of the meal
  image.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  //   To close details of the meal
  const close = document.getElementById("close");
  close.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}
