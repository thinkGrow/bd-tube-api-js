function loadCategories() {
  // fetch the data

  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data));
}

function displayCategories(data){
     console.log(data.categories);
}

loadCategories();
