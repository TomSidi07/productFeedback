let suggestionCont = document.querySelector(".suggestion__content");
let btn__addFeedback = document.querySelector(".btn--add-feedback");
let url = "data.json";
let DataS = [];
// Resquest Data
function request() {
  fetch(url)
    .then((req) => {
      return req.json();
    })
    .then((response) => {
      upDateUI(response);
      DataS = [...response.productRequests];
      console.log(DataS);
      btn__addFeedback.addEventListener("click", addFeedBack(DataS));
    })
    .catch((err) => {
      console.log(err);
    });
}

// Add new feedback
class FeedBack {
  constructor() {}
}

function addFeedBack(DataList) {
  let newFeedBack = "new feed back";
  DataList.push(newFeedBack /* input values */);
  console.log(newFeedBack, DataList);
}
// Update the suggestion content bloc
function upDateUI(response) {
  response.productRequests.forEach((data) => {
    let suggestion__card__code = `<div class="left">
              <div class="pan">${data.upvotes}</div>
            </div>
            <div class="right">
              <div class="header">
                <h2>${data.title}</h2>
              </div>
              <div class="content">
                <p>
                  ${data.description}
                </p>
                <btn class="pan">${data.category}</btn>
              </div>
            </div>`;
    let suggestionHtml = document.createElement("div");
    suggestionHtml.innerHTML = suggestion__card__code;
    suggestionHtml.classList.add("card--suggestion-content", "card");
    suggestionCont.appendChild(suggestionHtml);
    // console.log(data.productRequests[0]);
  });
}
request();
