function loadCategories() {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // convert promise to json
    .then((response) => response.json())
    // send data to display
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  //get the container
  const categoryContainer = document.getElementById("category-container");
  //Loop operation on Array of object
  for (let cat of categories) {
    console.log(cat);

    //create element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    
    `;

    categoryContainer.appendChild(categoryDiv);
  }

  //append element
}

loadCategories();
