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
    //create element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    
    `;

    categoryContainer.appendChild(categoryDiv);
  }

  //append element
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos));
  // .then(data) => displayVideos(data.)
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videos.forEach((video) => {
    // console.log(video);
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
            <figure>
                <img src="${video.thumbnail}" alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${video.title}</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
        `;

    videoContainer.append(videoDiv);
  });
};

loadVideos();
loadCategories();
