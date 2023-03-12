let apiData = [];

// fetch the data
const loadAiUniverse = async () => {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(URL);
  const data = await res.json();
  apiData.push(data.data.tools);
  displayAiUniverse(data.data.tools.slice(0, 6));
};

// display fetched data
const displayAiUniverse = (data) => {
  //   console.log(data);
  const mainContainer = document.getElementById("main-container");
  mainContainer.innerHTML = ""; // after click the show all button it will remove all previous data from innerHTML
  data.forEach((singleData) => {
    console.log(singleData);
    const cardDiv = document.createElement("div");
    const { image, features, name, published_in, id } = singleData;
    console.log(features);
    cardDiv.classList.add("col");
    cardDiv.innerHTML = `
        <div class="card h-100 rounded">
                            <img src="${image}" class="card-img-top p-4 rounded w-100 h-100" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Features</h5>
                                    ${
                                      "<ol class='text-body-secondary'>" +
                                      features
                                        .map(function (feature) {
                                          return "<li>" + feature + "</li>";
                                        })
                                        .join("") +
                                      "</ol>"
                                    }
                                <hr>
                                <h5 class="card-text mt-3">${name}</h5>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="d-flex gap-2">
                                    <i class="fa-solid fa-calendar-days"></i>
                                    <p class="text-body-secondary mt-0">${published_in}</p>
                                </div>
                                <div>
                                    <i onclick="fetchDetails('${id}')" class="btn btn-outline-danger rounded-circle fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                                </div>
                                
                            </div>
                                      
                        </div>
      `;
    mainContainer.appendChild(cardDiv);
  });
  // stop spinner
  toggleSpinner(false);
};

// fetch the single details data
const fetchDetails = (id) => {
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  //   console.log(URL);
  fetch(URL)
    .then((res) => res.json())
    .then((data) => displaySingleDetails(data.data));
};

// show details of single data
const displaySingleDetails = (data) => {
  console.log(data);
  const modalBody = document.getElementById("modal-body");
  const {
    image_link,
    input_output_examples,
    description,
    features,
    integrations,
    pricing,
    accuracy,
  } = data;
  modalBody.innerHTML = `
    <div class="card mb-2">
    <div class="row g-0">

      <div class="col-md-6" style="background: rgba(235, 87, 87, 0.05); ">
        <div class="card-body">
          <h5 class="card-title">${description}</h5>
          <div class="d-flex flex-lg-row gap-2">
            <div class="p-3 bg-white rounded">
                <p class="text-success">${
                  pricing === null
                    ? "No data found"
                    : pricing[0].price === "No cost"
                    ? "Free of Cost/"
                    : pricing[0].price === "0"
                    ? "Free of cost/"
                    : pricing[0].price
                }  ${
    pricing === null
      ? ""
      : pricing[0].plan === "Free"
      ? "Basic"
      : pricing[0].plan
  }</p>             
            </div>
            <div class="p-3 bg-white rounded">
                <p class="text-warning">${
                  pricing === null
                    ? "No data found"
                    : pricing[1].price === "0"
                    ? "Free of Cost/"
                    : pricing[1].price === "No cost"
                    ? "Free of Cost/"
                    : pricing[1].price
                }  ${
    pricing === null
      ? ""
      : pricing[1].plan === "Free"
      ? "Basic"
      : pricing[1].plan
  }</p>                       
            </div>
            <div class="p-3 bg-white rounded">
                <p class="text-danger">${
                  pricing === null
                    ? "No data found"
                    : pricing[2].price === "0"
                    ? "Free of Cost/"
                    : pricing[2].price === "No cost"
                    ? "Free of Cost/"
                    : pricing[2].price
                }  ${
    pricing === null
      ? ""
      : pricing[2].plan === "Free"
      ? "Basic"
      : pricing[2].plan
  }</p>        
            </div>
          </div>
          <div class="card-text">
          <div class="d-flex">
                <div>
                    <h5 class="card-title">Features</h5>
                    <ul class='text-body-secondary'>
                ${
                  features === null
                    ? "No data found"
                    : Object.values(features)
                        .map(function (feature) {
                          return "<li>" + feature.feature_name + "</li>";
                        })
                        .join("")
                }
                </ul>
                </div>
                <div>
                    <h5 class="card-title">Integrations</h5>
                    <ul class='text-body-secondary'>
                ${
                  integrations === null
                    ? "No data found"
                    : integrations
                        .map(function (integration) {
                          return "<li>" + integration + "</li>";
                        })
                        .join("")
                }
                </ul>
                </div>
          </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="position-relative">
                <img src="${image_link[0]}" class="img-fluid rounded" alt="...">

            <span class="position-absolute top-0 end-0 p-2 text-bg-danger rounded ${
              accuracy.score ? "d-block" : "d-none"
            }">${accuracy.score ? accuracy.score * 100 + "% accuracy" : ""}
            </span>          
        </div>
        <div class="card-body">
          <h5 class="card-title text-center">${
            input_output_examples === null
              ? "Can you give me an example?"
              : input_output_examples[0].input.slice(0, 150)
          }</h5>
          <p class="card-text text-body-secondary text-center">${
            input_output_examples === null
              ? "No! Not Yet! Take a break!!!"
              : input_output_examples[0].output
          }</p>
        </div>
      </div>
    </div>
  </div>
      `;
};

// spinner function to control the spinner
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading === true) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

const showFullData = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayAiUniverse(data.data.tools);
      document.getElementById("remove").classList.add("d-none");
    });
};

// sort by date
const sortByDate = (data) => {
  data.sort(
    (d1, d2) =>
      new Date(d1.published_in).getTime() - new Date(d2.published_in).getTime()
  );
  displayAiUniverse(data);
  document.getElementById("remove").classList.add("d-none");
};
// start spinning
toggleSpinner(true);
loadAiUniverse();
