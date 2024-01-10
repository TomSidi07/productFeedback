let suggestionCont = document.querySelector(".suggestion__content");
let btn__addFeedback = document.querySelector(".btn--add-feedback");
let url = "/data.json";
let feedbackList;
// Resquest Data
async function request() {
  await fetch(url || "")
    .then((req) => {
      return req.json();
    })
    .then((response) => {
      try {
        feedbackList = [...response.productRequests];
        upDateUI(feedbackList);
        if (btn__addFeedback)
          btn__addFeedback.addEventListener("click", () =>
            addFeedBack(feedbackList)
          );
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
// console.log(feedbackList);
// Add new feedback
class FeedBack {
  id;
  title;
  category;
  upvotes;
  status;
  comments;
  description;
  constructor(id, title, category, upvotes, status, comments = undefined) {
    this.id = id;
    this.comments = comments;
    this.category = category;
    this.status = status;
    this.title = title;
    this.upvotes = upvotes;
  }
}
let testFeedBack = new FeedBack(1, "Tom is the best", "Tom tom", 999, "BEST");

function addFeedBack() {
  feedbackList.push(testFeedBack /* input values */);

  upDateUI(feedbackList);
}
// Update the suggestion content bloc
async function upDateUI(response) {
  (function cleanSuggestCont() {
    (suggestionCont || "").innerHTML = "";
  })();
  await response.forEach((data) => {
    let suggestion__card__code = `<div class="left">
       
              <a href="#"><btn class="pan">${data.upvotes}</btn></a>
            </div>
            <div class="right">
              <div class="header">
                <h2>${data.title}</h2>
              </div>
              <div class="content">
                <p>
                  ${data.description}
                </p>
               <a href="#"> <btn class="pan">${data.category}</btn></a>
              </div>
            </div>`;
    let suggestionHtml = document.createElement("div");
    suggestionHtml.innerHTML = suggestion__card__code;
    suggestionHtml.classList.add("card--suggestion-content", "card");
    if (suggestionCont) suggestionCont.appendChild(suggestionHtml);
    // console.log(data.productRequests[0]);
  });
}
request();
