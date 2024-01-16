import CommentView from "./CommentView.js";
import DetailView from "./DetailView.js";
import RoadmapView from "./RoadmapView.js";
import SuggestionView from "./SuggestionView.js";
import FeedbackView from "./createFeedbackView.js";
let suugsestionMain = document.querySelector(".suggestion");
let roadmapMain = document.querySelector(".roadmap");
let suggestionCont = document.querySelector(".suggestion__content");
let btn__addFeedback = document.querySelector(".btn--add-feedback");
let btnCancel = document.querySelector(".btn--cancel");
let btnaddFeedback = document.querySelector(".add-feedback");
let IdCount;
let popup = document.querySelector(".popup");
let categories = document.querySelectorAll(".btn--cat");
let status = document.querySelectorAll(".btn--stat");

let url = "/data.json";
// collection de feedback
let collection = [];
let feedBacks;
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
            if (!localStorage.getItem(feedback.id))
              localStorage.setItem(feedback.id, JSON.stringify(feedback));
          });
          feedBacks = document.querySelectorAll(".feedback");
          SuggestionView.setCurrent(feedBacks, collection);

          if (btn__addFeedback)
            btn__addFeedback.addEventListener("click", (event) => {
              let addFeedback = document.querySelector(".add-feedback");

              event.preventDefault();
              if (popup) popup.classList.toggle("active");
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
class FeedBack {
  id;
  title;
  category;
  upvotes;
  status;
  comments;
  description;
  constructor(
    title,
    comments = undefined,
    description,
    category,
    upvotes,
    status
  ) {
    this.id = collection.length;
    this.comments = comments;
    this.category = category;
    this.description = description;
    this.status = status;
    this.title = title;
    this.upvotes = upvotes;
  }
}

function cleanSuggestCont() {
  (suggestionCont || "").innerHTML = "";
}
function createFeedback() {
  let { title, category, description } = FeedbackView;
  let newFeedback = new FeedBack(
    title,
    "",
    description,
    category,
    100,
    "suggestion"
  );
  collection.push(newFeedback);
  FeedbackView.render(newFeedback);
  localStorage.setItem(newFeedback.id, JSON.stringify(newFeedback));
}
// function addtoLs(feedback) {
//   let data = getFromLs(feedback.id);
//   if (Array.isArray(data)) {
//     data.push(feedback);
//     return localStorage.setItem(feedback.id, JSON.stringify(data));
//   }
// }
// function getFromLs(feedbackID) {
//   return JSON.parse(localStorage.getItem(feedbackID || "[]"));
// }

// function filterFeeds(collection, value) {
//   suggestionCont.innerHTML = "";
//   let fiteredArr = collection.filter((feedback) => {
//     return (
//       feedback.status === value.toLowerCase() ||
//       feedback.category === value.toLowerCase()
//     );
//   });
//   console.log(fiteredArr);
//   upDateUI(fiteredArr);
// }

function renderByStatus(status) {
  let filterArr = collection.filter((feedback) => {
    return feedback.status == status;
  });
  // cleanSuggestCont();
  return filterArr;
}
for (let i = 0; i < localStorage.length; i++) {
  if (JSON.parse(localStorage.getItem(i)))
    collection.push(JSON.parse(localStorage.getItem(i)));
}
// if (suugsestionMain)
// SuggestionView.upDateUI(renderByStatus("planned"));
// if (roadmapMain)
// SuggestionView.upDateUI(renderByStatus("live"));
// console.log(renderByStatus("suggestion"));
// console.log(collection);
let init = () => {
  // SuggestionView.setCurrent(feedBacks, collection);

  FeedbackView.Handler(createFeedback);
  // FeedbackView.render();
  // cleanSuggestCont();
  request();
  SuggestionView.upDateUI(collection);
  SuggestionView.sort(collection);
  DetailView.updateComment(collection);
  DetailView.render();
  DetailView.adjustComment();
};
init();
