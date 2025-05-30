function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  console.log(activeButtons);

  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

function loadCategories() {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // convert promise to json
    .then((response) => response.json())
    // send data to display
    .then((data) => displayCategories(data.categories));
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
  // .then(data) => displayVideos(data.)
}

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  // console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();

      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      // console.log(clickedButton);

      displayVideos(data.category);
      // console.log(document.getElementById{id})
    });
  // ;
};

function loadVideoDetails(video_id) {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayVideoDetails(data.video);
    });
}

const displayVideoDetails = (video) => {
  document.getElementById("video_details").showModal();

  const detailsContainer = document.getElementById("details-container");

  detailsContainer.innerHTML = `
  
          <div class="modal-box flex flex-col gap-4">
            <h3 class="text-2xl font-bold">${video.title}</h3>
            <img class="rounded-lg" src="${video.thumbnail}" alt="">
            <p>${video.description}</p>      
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn hover:bg-[#FF1F3D] hover:text-white">Close</button>
                </form>
            </div>
        </div>
  
  `;
};

function displayCategories(categories) {
  //get the container
  const categoryContainer = document.getElementById("category-container");
  //Loop operation on Array of object
  for (let cat of categories) {
    //create element
    const categoryDiv = document.createElement("div");
    // console.log(cat.category_id);
    categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;

    categoryContainer.appendChild(categoryDiv);
  }

  //append element
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.innerHTML = `
    <div
        class="py-20 col-span-full flex flex-col justify-center items-center text-center"
      >
        <img class="w-[120px]" src="./assets/Icon.png" alt="" />
        <h2 class="text-2xl font-bold">
          Oops!! Sorry, There is no content here
        </h2>
      </div>
     
    `;

    return;
  }

  videos.forEach((video) => {
    // console.log(video);

    const videoCard = document.createElement("div");

    videoCard.innerHTML = `
     <div class="card bg-base-100">
        <figure class="relative">
          <img class="w-full h-[150px] object-cover" src="${
            video.thumbnail
          }" alt="Shoes" />
          <span
            class="absolute bottom-2 right-2 text-sm rounded text-white bg-black px-2"
            >3hrs 56 min ago</span
          >
        </figure>

        <div class="flex gap-3 px-0 py-5">
          <div class="profile">
            <div class="avatar">
              <div
                class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2"
              >
                <img
                  src="${video.authors[0].profile_picture}"
                />
              </div>
            </div>
          </div>

          <div class="intro">
            <h2 class="text-sm font-semibold">${video.title}</h2>
            <p class="text-sm text-gray-400 flex gap-1">
             ${video.authors[0].profile_name}
              ${
                video.authors[0].verified == true
                  ? `<img
                class="w-5 h-5"
                src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"
                alt=""
              />`
                  : ``
              }
            </p>
            <p class="text-sm text-gray-400">${video.others.views} views</p>
          </div>
          
          </div>

          <button id="my_modal_1" class="btn w-full" onclick=loadVideoDetails("${
            video.video_id
          }")>
          
          View Details

          </button>

          
      </div>
    
    `;
    //append
    videoContainer.append(videoCard);
  });
  // hideLoader();
};

// loadVideos();
loadCategories();
