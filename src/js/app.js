import DetailView from "./DetailView.js";
import SuggestionView from "./SuggestionView.js";
import FeedbackView from "./createFeedbackView.js";

let suggestionCont = document.querySelector(".suggestion__content");
let btn__addFeedback = document.querySelector(".btn--add-feedback");
let btnCancel = document.querySelector(".btn--cancel");
let btnaddFeedback = document.querySelector(".add-feedback");
let IdCount;
let popup = document.querySelector(".popup");
let categories = document.querySelectorAll(".btn--cat");
let status = document.querySelectorAll(".btn--stat");

// console.log(btn__addFeedback);
// console.log(popup);
let url = "/data.json";
// collection de feedback
let collection = [];
// suggestionSort.addEventListener("change", (eve) => {
//   console.log(suggestionSort.value);
//   filterByComment(suggestionSort.value);
// });

//******************************************************************************************** */ Resquest Data

// Fetch and store to LS
async function request() {
  try {
    await fetch(url || "")
      .then((req) => {
        return req.json();
      })
      .then((response) => {
        try {
          // collection = [...response.productRequests];

          IdCount = collection.length++;
          response.productRequests.forEach((feedback) => {
            // addtoLs();
            // console.log(feedback);
            localStorage.setItem(feedback.id, JSON.stringify(feedback));
          });
          let feedBacks = document.querySelectorAll(".feedback");
          SuggestionView.setCurrent(feedBacks);

          if (btn__addFeedback)
            btn__addFeedback.addEventListener("click", (event) => {
              let addFeedback = document.querySelector(".add-feedback");

              event.preventDefault();
              popup.classList.toggle("active");
              if (btnCancel)
                btnCancel.addEventListener("click", (eve) => {
                  event.preventDefault();
                  // addFeedBack(collection);
                  popup.classList.remove("active");
                });
            });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
}

// Events
status.forEach((btn) => {
  btn.addEventListener("click", (eve) => {
    SuggestionView.filterFeeds(collection, btn.textContent);
  });
});
// if (suggestionSort)
//   suggestionSort.addEventListener("change", (eve) => {
//     // filterSort(collection, suggestionSort.value);
//     console.log(suggestionSort.value);
//   });
// Add new feedback
class FeedBack {
  id;
  title;
  category;
  upvotes;
  status;
  comments;
  description;
  constructor(title, category, upvotes, status, comments = undefined) {
    this.id = collection.length;
    this.comments = comments;
    this.category = category;
    this.status = status;
    this.title = title;
    this.upvotes = upvotes;
  }
}

// Update the suggestion content bloc
// async function upDateUI(response) {
//   await response.forEach((data) => {
//     let suggestion__card__code = `<div class="left">
//               <a href="#"><btn class="pan">${data.upvotes}</btn></a>
//             </div>
//             <div class="right">
//               <div class="header">
//                 <h2>${data.title}</h2>
//               </div>
//               <div class="content">
//                 <p>
//                   ${data.description}
//                 </p>
//                <a href="#"> <btn class="pan">${data.category}</btn></a>
//               </div>
//             </div>`;
//     let suggestionHtml = document.createElement("a");
//     suggestionHtml.href = "/src/feedback-detail.html";
//     suggestionHtml.innerHTML = suggestion__card__code;
//     suggestionHtml.classList.add(
//       "card--suggestion-content",
//       "card",
//       "feedback"
//     );
//     if (suggestionCont) suggestionCont.appendChild(suggestionHtml);
//     // console.log(data.productRequests[0]);
//   });
// }
function cleanSuggestCont() {
  (suggestionCont || "").innerHTML = "";
}
function createFeedback() {
  let { title, category, comment } = FeedbackView;
  let newFeedback = new FeedBack(title, category, 0, "publish", comment);
  collection.push(newFeedback);
  FeedbackView.render(newFeedback);
  localStorage.setItem(newFeedback.id, JSON.stringify(newFeedback));
}
function addtoLs(feedback) {
  let data = getFromLs(feedback.id);
  if (Array.isArray(data)) {
    data.push(feedback);
    localStorage.setItem(feedback.id, JSON.stringify(data));
  }
  return;
}
let obj = { id: 1, name: "test" };
// addtoLs(obj);
function getFromLs(feedbackID) {
  // console.log(localStorage.getItem(JSON.stringify(feedbackID) || "[]"));
  return JSON.parse(localStorage.getItem(feedbackID || "[]"));
}

function filterFeeds(collection, value) {
  suggestionCont.innerHTML = "";
  let fiteredArr = collection.filter((feedback) => {
    return (
      feedback.status === value.toLowerCase() ||
      feedback.category === value.toLowerCase()
    );
  });
  console.log(fiteredArr);
  upDateUI(fiteredArr);
}

function renderByStatus(status) {
  let filterArr = collection.filter((feedback) => {
    return feedback.status == status;
  });
  // cleanSuggestCont();
  return filterArr;
}
// function filterSort(collection, value) {
//   let mostCommented = collection.filter((feedback) => {
//     return feedback.comments > 1;
//   });
//   let leastCommented = collection.filter((feedback) => {
//     return feedback.comments <= 1;
//   });

//   let mostUpvoted = collection.filter((feedback) => {
//     return feedback.upvote > 1;
//   });
//   let leastUpvoted = collection.filter((feedback) => {
//     return feedback.upvote <= 1;
//   });
//   if (value == "mostcomment") {
//     return mostCommented;
//   }
//   suggestionCont.innerHTML = "";
//   upDateUI(mostCommented);
// }
// filterSort(collection, "mostcomment");
// console.log(filterSort(collection, "mostcomment"));
// filterFeeds();
for (let i = 0; i < localStorage.length; i++) {
  if (JSON.parse(localStorage.getItem(i)))
    collection.push(JSON.parse(localStorage.getItem(i)));
}
let test = collection.filter(feed => feed.upvotes > 0).sort((a, b) => {
  return a.upvotes<b.upvotes
});
test.forEach(feed=>console.log(feed.upvotes))
// console.log(renderByStatus("suggestion"));

let init = () => {
  FeedbackView.Handler(createFeedback);
  // FeedbackView.render();
  // cleanSuggestCont();
  request();
  SuggestionView.upDateUI(collection);
  SuggestionView.sort(collection);
  SuggestionView.upDateUI(renderByStatus("suggestion"));
  DetailView.updateComment(collection);
  DetailView.render();
  DetailView.adjustComment();
};
init();
